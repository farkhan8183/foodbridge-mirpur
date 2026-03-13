import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { userDataContext } from '../../context/userContext';

function RecipientPanel() {
  let{userData}=useContext(userDataContext)
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecipient, setIsRecipient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  
  const [availableFood, setAvailableFood] = useState([
    { 
      id: 1, 
      donor: "Fresh Bites Restaurant", 
      items: "15 meals - Rice, Curry, Vegetables", 
      quantity: "15 plates",
      distance: "1.2 km", 
      pickupTime: "2:30 PM - 4:30 PM",
      expiresIn: "2 hours",
      type: "Cooked Meals",
      dietary: "Halal",
      rating: 4.8,
      image: "🍲"
    },
    { 
      id: 2, 
      donor: "Mirpur Bakery", 
      items: "20 bread loaves, 15 pastries", 
      quantity: "35 pieces",
      distance: "0.8 km", 
      pickupTime: "Now - 5:00 PM",
      expiresIn: "3 hours",
      type: "Bakery",
      dietary: "Vegetarian",
      rating: 4.5,
      image: "🍞"
    },
    { 
      id: 3, 
      donor: "Community Kitchen", 
      items: "30 meals - Biryani, Salad, Raita", 
      quantity: "30 plates",
      distance: "2.5 km", 
      pickupTime: "3:00 PM - 5:00 PM",
      expiresIn: "1.5 hours",
      type: "Cooked Meals",
      dietary: "Halal",
      rating: 4.9,
      image: "🍛"
    },
    { 
      id: 4, 
      donor: "Green Grocers", 
      items: "Fresh vegetables - Potatoes, Onions, Tomatoes", 
      quantity: "10 kg",
      distance: "1.5 km", 
      pickupTime: "Now - 6:00 PM",
      expiresIn: "5 hours",
      type: "Groceries",
      dietary: "Vegan",
      rating: 4.6,
      image: "🥬"
    },
    { 
      id: 5, 
      donor: "Karim Store", 
      items: "Canned goods, Rice, Lentils", 
      quantity: "15 kg",
      distance: "2.1 km", 
      pickupTime: "4:00 PM - 7:00 PM",
      expiresIn: "24 hours",
      type: "Non-perishable",
      dietary: "All",
      rating: 4.3,
      image: "🥫"
    }
  ]);

  const [myRequests, setMyRequests] = useState([
    { id: 101, donor: "Fresh Bites Restaurant", items: "5 meals", status: "ready", pickupCode: "FD123", requestedAt: "1 hour ago" },
    { id: 102, donor: "Mirpur Bakery", items: "10 bread loaves", status: "pending", requestedAt: "30 mins ago" },
  ]);

  const [completedRequests, setCompletedRequests] = useState([
    { id: 201, donor: "Ahmed Family", items: "3 kg rice", completedAt: "Yesterday", rating: 5 },
    { id: 202, donor: "Community Kitchen", items: "8 meals", completedAt: "2 days ago", rating: 4 },
  ]);

  const [stats, setStats] = useState({
    mealsReceived: 47,
    familiesHelped: 12,
    pendingRequests: 2,
    completedPickups: 23,
    savedAmount: "₨15,000",
    rating: 4.7
  });

  const [favorites, setFavorites] = useState([1, 3]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pickupCode, setPickupCode] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Simulate a logged-in recipient for UI purposes
    setUser({ 
      name: "Recipient", 
      familySize: 4,
      location: 'Mirpur 10, Block C',
      preferences: ['Halal', 'Vegetarian']
    });
    setIsLoggedIn(true);
    setIsRecipient(true);
    setLoading(false);
  }, []);

  // Logout function using axios
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/recipient/logout", { withCredentials: true });
      console.log(result.data);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const handleRequestFood = (item) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    const newRequest = {
      id: Date.now(),
      donor: item.donor,
      items: item.quantity,
      status: "pending",
      requestedAt: "Just now"
    };
    
    setMyRequests(prev => [newRequest, ...prev]);
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests + 1
    }));
    
    toast.success(`Food requested from ${item.donor}! You'll be notified when ready.`);
    setShowRequestModal(false);
  };

  const handleConfirmPickup = (request) => {
    if (pickupCode === 'FD123' || pickupCode === 'DEMO123') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Move to completed
      const completed = {
        ...request,
        id: request.id + 1000,
        completedAt: 'Just now',
        rating: 5
      };
      setCompletedRequests(prev => [completed, ...prev]);
      
      // Remove from my requests
      setMyRequests(prev => prev.filter(r => r.id !== request.id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        mealsReceived: prev.mealsReceived + parseInt(request.items) || prev.mealsReceived + 1,
        completedPickups: prev.completedPickups + 1,
        pendingRequests: prev.pendingRequests - 1
      }));
      
      toast.success(`Pickup confirmed! Thank you for receiving food.`);
      setPickupCode('');
    } else {
      toast.error("Invalid pickup code. Please check with the donor.");
    }
  };

  const handleCancelRequest = (requestId) => {
    setMyRequests(prev => prev.filter(r => r.id !== requestId));
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1
    }));
    toast.info("Request cancelled");
  };

  const handleSubmitRating = () => {
    toast.success(`Thank you for your ${rating}-star rating!`);
    setShowRatingModal(false);
    setRating(5);
    setFeedback('');
  };

  const handleToggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(prev => prev.filter(id => id !== itemId));
      toast.info("Removed from favorites");
    } else {
      setFavorites(prev => [...prev, itemId]);
      toast.success("Added to favorites");
    }
  };

  const handleShareInfo = () => {
    toast.success("Location shared with volunteer");
  };

  const handleContactVolunteer = () => {
    toast.info("Connecting to volunteer chat...");
  };

  const handleReportIssue = () => {
    toast.warning("Issue reported to support team");
  };

  const filteredFood = availableFood.filter(item => {
    const matchesSearch = item.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="text-lg font-semibold">Loading recipient dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 py-8 lg:px-32 relative">
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
              {['🎉', '🎊', '🍽️', '🥘', '⭐', '💫'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 mb-8 text-white shadow-xl" data-aos="fade-down">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
            <p className="opacity-90">New food available near you. Check out the latest donations!</p>
            <div className="flex gap-4 mt-3">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Family size: {user?.familySize}</span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">📍 {user?.location}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" data-aos="fade-up">
        {[
          { label: "Meals Received", value: stats.mealsReceived, icon: "🍽️", color: "from-green-500 to-emerald-500" },
          { label: "Families Helped", value: stats.familiesHelped, icon: "👪", color: "from-blue-500 to-cyan-500" },
          { label: "Pending", value: stats.pendingRequests, icon: "⏳", color: "from-yellow-500 to-amber-500" },
          { label: "Pickups Done", value: stats.completedPickups, icon: "✅", color: "from-purple-500 to-pink-500" },
          { label: "Saved", value: stats.savedAmount, icon: "💰", color: "from-emerald-500 to-teal-500" },
          { label: "Rating", value: stats.rating, icon: "⭐", color: "from-orange-500 to-red-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all">
            <div className={`bg-gradient-to-br ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

    

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-4 mb-8 shadow-lg" data-aos="fade-up">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search food donors or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              <option value="Cooked Meals">Cooked Meals</option>
              <option value="Bakery">Bakery</option>
              <option value="Groceries">Groceries</option>
              <option value="Non-perishable">Non-perishable</option>
            </select>
          </div>
        </div>
      </div>

      {/* My Requests Section */}
      {myRequests.length > 0 && (
        <div className="mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> My Requests
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {myRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl p-4 shadow-lg border-l-8 border-yellow-500">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status.toUpperCase()}
                    </span>
                    <h3 className="font-bold mt-2">{request.donor}</h3>
                    <p className="text-sm text-gray-600">{request.items}</p>
                    <p className="text-xs text-gray-500 mt-1">Requested: {request.requestedAt}</p>
                    {request.pickupCode && (
                      <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded mt-2">
                        Pickup Code: <span className="font-bold">{request.pickupCode}</span>
                      </p>
                    )}
                  </div>
                  <span className="text-3xl">{request.status === 'ready' ? '✅' : '⏳'}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  {request.status === 'ready' ? (
                    <>
                      <button
                        onClick={() => {
                          setSelectedItem(request);
                          setShowRatingModal(true);
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        Confirm Pickup
                      </button>
                      <button
                        onClick={() => handleContactVolunteer()}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        Contact
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleCancelRequest(request.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => toast.info("Checking status...")}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        Check Status
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Food Grid */}
      <div className="mb-8" data-aos="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>🍲</span> Available Near You
          </h2>
          <span className="text-sm text-gray-600">{filteredFood.length} items found</span>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFood.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all relative ${
                favorites.includes(item.id) ? 'border-2 border-yellow-400' : ''
              }`}
            >
              {/* Favorite Button */}
              <button
                onClick={() => handleToggleFavorite(item.id)}
                className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
              >
                {favorites.includes(item.id) ? '❤️' : '🤍'}
              </button>

              {/* Food Image/Icon */}
              <div className="text-6xl mb-4 text-center">{item.image}</div>

              {/* Donor Info */}
              <h3 className="text-xl font-bold mb-2">{item.donor}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.items}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {item.type}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {item.dietary}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                  ⭐ {item.rating}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="font-semibold text-sm">{item.quantity}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Distance</p>
                  <p className="font-semibold text-sm">{item.distance}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="font-semibold text-sm">{item.pickupTime}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Expires</p>
                  <p className="font-semibold text-sm text-red-600">{item.expiresIn}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setShowRequestModal(true);
                  }}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105"
                >
                  Request Food
                </button>
                <button
                  onClick={() => toast.info(`More details about ${item.donor}`)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed History */}
      <div className="bg-white rounded-2xl p-6 shadow-xl mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📜</span> Pickup History
        </h2>
        <div className="space-y-4">
          {completedRequests.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="font-semibold">{item.donor}</h3>
                  <p className="text-sm text-gray-600">{item.items}</p>
                  <p className="text-xs text-gray-500">{item.completedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">{'⭐'.repeat(item.rating)}</span>
                <button
                  onClick={() => {
                    setRating(item.rating);
                    setShowRatingModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Rate Again
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Tips Section */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6" data-aos="fade-up">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>💡</span> Food Tips & Resources
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { tip: "Store perishables properly", icon: "🧊", desc: "Keep cold food cold until pickup" },
            { tip: "Meal Planning", icon: "📝", desc: "Plan meals to reduce waste" },
            { tip: "Nutrition Guide", icon: "🥗", desc: "Balanced meal suggestions" }
          ].map((tip, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
              <span className="text-3xl">{tip.icon}</span>
              <div>
                <h4 className="font-semibold">{tip.tip}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Food Modal */}
      {showRequestModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" data-aos="zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Confirm Request</h3>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center text-6xl mb-4">{selectedItem.image}</div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="font-bold text-lg">{selectedItem.donor}</p>
                <p className="text-gray-600">{selectedItem.items}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Pickup Time</p>
                  <p className="font-semibold">{selectedItem.pickupTime}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Distance</p>
                  <p className="font-semibold">{selectedItem.distance}</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">⚠️ Pickup Instructions:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  <li>Bring your own bags/containers</li>
                  <li>Have ID ready for verification</li>
                  <li>Pickup within given time window</li>
                </ul>
              </div>

              <button
                onClick={() => handleRequestFood(selectedItem)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" data-aos="zoom-in">
            <h3 className="text-2xl font-bold mb-6">Rate Your Experience</h3>
            
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-all hover:scale-110 ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your feedback (optional)"
                className="w-full p-3 border rounded-lg"
                rows="4"
              />

              <button
                onClick={handleSubmitRating}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
              >
                Submit Rating
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

export default RecipientPanel;