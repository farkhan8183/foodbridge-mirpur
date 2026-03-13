import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { userDataContext } from '../../context/userContext';

function VolunteerPanel() {

  let{userData}=useContext(userDataContext);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  
  const [deliveries, setDeliveries] = useState([
    { id: 1, donor: "Fresh Bites Restaurant", items: "15 meals", address: "Block A, Mirpur 10", distance: "2.5 km", status: "available", priority: "high", time: "30 mins ago" },
    { id: 2, donor: "Ahmed Family", items: "5 kg rice", address: "Block C, Mirpur 11", distance: "1.2 km", status: "available", priority: "medium", time: "15 mins ago" },
    { id: 3, donor: "Mirpur Bakery", items: "20 bread loaves", address: "Block B, Mirpur 10", distance: "3.7 km", status: "assigned", priority: "low", time: "1 hour ago" },
    { id: 4, donor: "Community Kitchen", items: "30 meals", address: "Block D, Mirpur 12", distance: "4.1 km", status: "available", priority: "high", time: "10 mins ago" },
  ]);

  const [completedDeliveries, setCompletedDeliveries] = useState([
    { id: 101, donor: "Karim Store", items: "10 kg vegetables", address: "Block E, Mirpur 10", completedAt: "2 hours ago" },
    { id: 102, donor: "Rashid Sweets", items: "25 sweets boxes", address: "Block F, Mirpur 11", completedAt: "5 hours ago" },
  ]);

  const [stats, setStats] = useState({
    todayDeliveries: 4,
    totalDeliveries: 47,
    totalDistance: 156,
    peopleFed: 189,
    hoursVolunteered: 24,
    rating: 4.8
  });

  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('available');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Simulate a logged-in volunteer for UI purposes
    setUser({ name:  "Volunteer", rating: 4.9, deliveriesCompleted: 47 });
    setIsLoggedIn(true);
    setIsVolunteer(true);
    setLoading(false);
  }, []);

  // Logout function using axios (exactly as specified)
  const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/volunteer/logout", {withCredentials:true})
            console.log(result.data)
            toast.success("LogOut Successfully")
            //get..
            navigate("/")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
        
  };

  const handleAcceptDelivery = (delivery) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    setDeliveries(prev => prev.map(d => 
      d.id === delivery.id ? { ...d, status: 'assigned' } : d
    ));
    toast.success(`Delivery #${delivery.id} accepted! Head to ${delivery.address}`);
  };

  const handleCompleteDelivery = (delivery) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    // Move to completed deliveries
    const completed = {
      ...delivery,
      id: delivery.id + 1000,
      completedAt: 'Just now'
    };
    setCompletedDeliveries(prev => [completed, ...prev]);
    
    // Remove from active deliveries
    setDeliveries(prev => prev.filter(d => d.id !== delivery.id));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      todayDeliveries: prev.todayDeliveries + 1,
      totalDeliveries: prev.totalDeliveries + 1,
      totalDistance: prev.totalDistance + parseFloat(delivery.distance),
      peopleFed: prev.peopleFed + (delivery.items.includes('meals') ? parseInt(delivery.items) : 5)
    }));
    
    toast.success(`Delivery completed! Thank you for your service!`);
  };

  const handleViewDetails = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDeliveryModal(true);
  };

  const handleTrackDelivery = (delivery) => {
    toast.info(`Tracking delivery #${delivery.id} - ETA: 15 minutes`);
  };

  const handleContactDonor = (donor) => {
    toast.info(`Contacting ${donor} via chat...`);
  };

  const handleShareLocation = () => {
    toast.success("Location shared with donor and recipient");
  };

  const handleSubmitNotes = () => {
    if (deliveryNotes.trim()) {
      toast.success("Delivery notes saved");
      setDeliveryNotes('');
      setShowDeliveryModal(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-lg font-semibold">Loading volunteer dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-8 lg:px-32 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl"
              style={{
                left: Math.random() * 100 + '%',
                animation: `confetti ${Math.random() * 3 + 2}s linear forwards`,
                top: '-10%',
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {['🎉', '🎊', '🤝', '🚚', '⭐', '💫'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      {/* Emergency Alert Banner (Conditional) */}
      {deliveries.filter(d => d.priority === 'high' && d.status === 'available').length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 mb-6 animate-pulse" data-aos="fade-down">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚨</span>
              <div>
                <h3 className="font-bold">High Priority Deliveries Available!</h3>
                <p className="text-sm opacity-90">{deliveries.filter(d => d.priority === 'high' && d.status === 'available').length} urgent deliveries need volunteers</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('available')}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90"
            >
              View Now
            </button>
          </div>
        </div>
      )}

      {/* Header Section with Volunteer Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8" data-aos="fade-down">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.[0] || 'V'}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Welcome back, {user?.name || 'Volunteer'}!
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <span>⭐</span> {user?.rating || 4.9} Rating
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {stats.totalDeliveries} Deliveries
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                Level 3 Volunteer
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
        >
          <span>🚪</span> Logout
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" data-aos="fade-up">
        {[
          { label: "Today's Deliveries", value: stats.todayDeliveries, icon: "📦", color: "from-emerald-500 to-green-500", change: "+2" },
          { label: "Total Deliveries", value: stats.totalDeliveries, icon: "🚚", color: "from-blue-500 to-cyan-500", change: "+47" },
          { label: "Distance (km)", value: stats.totalDistance, icon: "📍", color: "from-orange-500 to-amber-500", change: "+12" },
          { label: "People Fed", value: stats.peopleFed, icon: "👥", color: "from-purple-500 to-pink-500", change: "+28" },
          { label: "Hours", value: stats.hoursVolunteered, icon: "⏰", color: "from-indigo-500 to-blue-500", change: "+4" },
          { label: "Rating", value: stats.rating, icon: "⭐", color: "from-yellow-500 to-amber-500", change: "+0.2" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all">
            <div className={`bg-gradient-to-br ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-green-600 mt-1">{stat.change} today</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-aos="fade-up">
        {[
          { label: "Start Shift", icon: "▶️", color: "bg-green-500", action: () => toast.success("Shift started! 8:00 AM - 4:00 PM") },
          { label: "End Shift", icon: "⏹️", color: "bg-red-500", action: () => toast.info("Shift ended. Great work today!") },
          { label: "Share Location", icon: "📍", color: "bg-blue-500", action: handleShareLocation },
          { label: "Contact Support", icon: "🎧", color: "bg-purple-500", action: () => toast.info("Connecting to support...") }
        ].map((action, i) => (
          <button
            key={i}
            onClick={action.action}
            className={`${action.color} hover:opacity-90 text-white p-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all hover:scale-105 shadow-lg`}
          >
            <span className="text-2xl">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* Tabs for Deliveries */}
      <div className="flex gap-2 mb-6" data-aos="fade-up">
        {['available', 'assigned', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
              activeTab === tab 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab} Deliveries
            {tab === 'available' && ` (${deliveries.filter(d => d.status === 'available').length})`}
            {tab === 'assigned' && ` (${deliveries.filter(d => d.status === 'assigned').length})`}
            {tab === 'completed' && ` (${completedDeliveries.length})`}
          </button>
        ))}
      </div>

      {/* Deliveries Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8" data-aos="fade-up">
        {/* Available/Assigned Deliveries */}
        {(activeTab === 'available' || activeTab === 'assigned') && 
          deliveries
            .filter(d => d.status === activeTab)
            .map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border-l-8 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        delivery.priority === 'high' ? 'bg-red-100 text-red-700' :
                        delivery.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {delivery.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-sm text-gray-500">{delivery.time}</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2">{delivery.donor}</h3>
                  </div>
                  <span className="text-4xl">🍱</span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 w-20">Items:</span>
                    <span className="font-semibold">{delivery.items}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-semibold">{delivery.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 w-20">Distance:</span>
                    <span className="font-semibold text-blue-600">{delivery.distance}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {activeTab === 'available' ? (
                    <>
                      <button
                        onClick={() => handleAcceptDelivery(delivery)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105"
                      >
                        Accept Delivery
                      </button>
                      <button
                        onClick={() => handleViewDetails(delivery)}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-all"
                      >
                        Details
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleTrackDelivery(delivery)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                      >
                        Track
                      </button>
                      <button
                        onClick={() => handleContactDonor(delivery.donor)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => handleCompleteDelivery(delivery)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-all"
                      >
                        Complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

        {/* Completed Deliveries */}
        {activeTab === 'completed' && 
          completedDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg border-l-8 border-green-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    COMPLETED
                  </span>
                  <h3 className="text-xl font-bold mt-2">{delivery.donor}</h3>
                </div>
                <span className="text-4xl">✅</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 w-20">Items:</span>
                  <span className="font-semibold">{delivery.items}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 w-20">Address:</span>
                  <span className="font-semibold">{delivery.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 w-20">Completed:</span>
                  <span className="font-semibold text-green-600">{delivery.completedAt}</span>
                </div>
              </div>

              <button
                onClick={() => toast.info(`Rating submitted! Thanks for delivering to ${delivery.donor}`)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Rate Experience ⭐
              </button>
            </div>
          ))}
      </div>

      {/* Map Preview Section */}
      <div className="bg-white rounded-2xl p-6 shadow-xl mb-8" data-aos="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span>🗺️</span> Live Delivery Map
          </h3>
          <button 
            onClick={() => toast.info("Opening full map view...")}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View Full Map →
          </button>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-48 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full grid grid-cols-12 grid-rows-8">
              {[...Array(96)].map((_, i) => (
                <div key={i} className="border border-blue-200"></div>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-2">📍</div>
            <p className="text-gray-700 font-medium">3 active deliveries in Mirpur area</p>
            <p className="text-sm text-gray-600 mt-1">Nearest pickup: 1.2 km away</p>
          </div>
        </div>
      </div>

      {/* Achievements & Milestones */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-xl" data-aos="fade-up">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>🏆</span> Your Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚀", title: "Quick Starter", desc: "10 deliveries", progress: 47, total: 50, color: "from-blue-500 to-cyan-500" },
            { icon: "❤️", title: "Food Hero", desc: "Feed 100 people", progress: 189, total: 200, color: "from-red-500 to-pink-500" },
            { icon: "⭐", title: "Top Rated", desc: "4.8+ rating", progress: 4.9, total: 5, color: "from-yellow-500 to-amber-500" },
            { icon: "🌙", title: "Night Owl", desc: "Night deliveries", progress: 12, total: 20, color: "from-indigo-500 to-purple-500" }
          ].map((achievement, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow">
              <div className={`bg-gradient-to-br ${achievement.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl mb-3`}>
                {achievement.icon}
              </div>
              <h4 className="font-bold">{achievement.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{achievement.desc}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full`} 
                  style={{width: `${(achievement.progress / achievement.total) * 100}%`}}
                ></div>
              </div>
              <p className="text-xs text-right mt-1">{achievement.progress}/{achievement.total}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details Modal */}
      {showDeliveryModal && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" data-aos="zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Delivery Details</h3>
              <button 
                onClick={() => setShowDeliveryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Donor</p>
                <p className="font-bold text-lg">{selectedDelivery.donor}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Items</p>
                  <p className="font-semibold">{selectedDelivery.items}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Distance</p>
                  <p className="font-semibold">{selectedDelivery.distance}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Full Address</p>
                <p className="font-semibold">{selectedDelivery.address}</p>
                <p className="text-xs text-gray-500 mt-1">Block: Mirpur 10, Dhaka</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Delivery Notes</label>
                <textarea
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Add any special instructions..."
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                />
              </div>

              <button
                onClick={handleSubmitNotes}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Save Notes & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default VolunteerPanel;