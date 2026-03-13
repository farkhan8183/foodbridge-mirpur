import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { authDataContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { userDataContext } from '../../context/userContext';


function DonorPanel() {
  let{userData}=useContext(userDataContext)
  
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDonor, setIsDonor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  let {serverUrl}=useContext(authDataContext)
  const [testimonials, setTestimonials] = useState([
    "Thank you for donating food today! Your contribution helps reduce waste and feed families.",
    "A generous donor shared meals with the community. Keep up the great work!"
  ]);
  const [liveDonations, setLiveDonations] = useState([
    { name: "Fresh Bites Restaurant", items: "15 meals", time: "2 min ago", type: "Restaurant", initial: "F" },
    { name: "Ahmed Family", items: "5 kg rice", time: "15 min ago", type: "Individual", initial: "A" },
    { name: "Mirpur Bakery", items: "20 bread loaves", time: "1 hour ago", type: "Restaurant", initial: "M" },
    { name: "Fatima", items: "Vegetables", time: "2 hours ago", type: "Individual", initial: "F" }
  ]);
  const [formData, setFormData] = useState({
    donationType: '',
    quantity: '',
    reason: '',
    feedback: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Simulate a logged-in donor for UI purposes
    setUser({ name: userData?.name || "John Doe" });
    setIsLoggedIn(true);
    setIsDonor(true);
    setLoading(false);
  }, []);

  // Logout function using axios
 const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            console.log(result.data)
            toast.success("LogOut Successfully")
            //get..
            navigate("/")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
        
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    // Add to live donations
    const newDonation = {
      name: userData?.name || "John Doe",
      items: formData.quantity,
      time: "Just now",
      type: "Individual",
      initial: user?.name?.[0] || "J"
    };
    setLiveDonations(prev => [newDonation, ...prev.slice(0, 5)]);
    
    // Simulate submission (no API call)
    const newTestimonial = `Thank you for donating ${formData.quantity}! Your ${formData.donationType} helps feed the community.`;
    setTestimonials(prev => [newTestimonial, ...prev]);
    toast.success('Donation submitted successfully! Thank you for your contribution.');
    setFormData({ donationType: '', quantity: '', reason: '', feedback: '' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-100 to-yellow-100 px-6 py-12 lg:px-32 relative">
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
              {['🎉', '🎊', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      

      {/* Header */}
      <div className="text-center mb-8" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 drop-shadow-md">
          Welcome, {user?.name || 'Donor'}!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Thank you for joining FoodBridge Mirpur. Your donations make a real difference in reducing food waste and helping those in need.
        </p>
        
        {/* Donation Badges/Achievements */}
        <div className="flex justify-center gap-4 mt-6 mb-4">
          {[
            { badge: "🥉", label: "First Donation", achieved: true },
            { badge: "🥈", label: "5 Donations", achieved: false },
            { badge: "🥇", label: "10 Donations", achieved: false },
            { badge: "🌟", label: "Community Hero", achieved: false }
          ].map((badge, i) => (
            <div key={i} className="text-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-3xl mx-auto ${!badge.achieved && 'opacity-30 grayscale'}`}>
                {badge.badge}
              </div>
              <div className="text-xs mt-1 font-medium">{badge.label}</div>
              {badge.achieved && <span className="text-green-500 text-xs">✓ Earned</span>}
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>

      {/* Impact Counter / Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12" data-aos="fade-up">
        {[
          { value: "1,234", label: "Meals Donated", icon: "🍽️", color: "text-emerald-600" },
          { value: "567", label: "People Fed", icon: "👥", color: "text-blue-600" },
          { value: "89", label: "Active Donors", icon: "🤝", color: "text-purple-600" },
          { value: "2,345", label: "KG Food Saved", icon: "🌍", color: "text-orange-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-2xl transition-shadow">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-gray-600 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Donation Categories with Icon Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" data-aos="fade-up">
        {[
          { icon: "🍚", label: "Grains & Rice", color: "from-amber-400 to-orange-400" },
          { icon: "🥬", label: "Fresh Produce", color: "from-green-400 to-emerald-400" },
          { icon: "🍲", label: "Cooked Meals", color: "from-red-400 to-pink-400" },
          { icon: "🥫", label: "Canned Goods", color: "from-blue-400 to-cyan-400" },
          { icon: "🥛", label: "Dairy", color: "from-purple-400 to-violet-400" },
          { icon: "🍞", label: "Bakery", color: "from-yellow-400 to-amber-400" },
          { icon: "🥩", label: "Protein", color: "from-rose-400 to-red-400" },
          { icon: "🧃", label: "Beverages", color: "from-indigo-400 to-blue-400" }
        ].map((cat, i) => (
          <div 
            key={i}
            onClick={() => {
              setFormData({...formData, donationType: cat.label});
              toast.info(`Selected: ${cat.label}`);
            }}
            className={`bg-gradient-to-br ${cat.color} p-4 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300`}
          >
            <div className="text-4xl mb-2">{cat.icon}</div>
            <div className="text-white font-bold text-sm md:text-base">{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Donation Progress Tracker */}
      <div className="bg-white rounded-3xl p-8 shadow-xl mb-12" data-aos="fade-up">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🎯</span> Monthly Donation Goal
        </h3>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">Progress: 75%</span>
          <span className="text-emerald-600 font-bold">750/1000 meals</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full" style={{width: '75%'}}></div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="border-r border-gray-200">
            <div className="text-2xl font-bold text-emerald-600">250</div>
            <div className="text-sm text-gray-500">This Week</div>
          </div>
          <div className="border-r border-gray-200">
            <div className="text-2xl font-bold text-emerald-600">500</div>
            <div className="text-sm text-gray-500">This Month</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">250</div>
            <div className="text-sm text-gray-500">To Go</div>
          </div>
        </div>
      </div>

      {/* Donation Form */}
      <div className="max-w-2xl mx-auto mb-12" data-aos="fade-up">
        <div className="bg-gradient-to-br from-orange-100 via-white to-orange-50 border-l-[6px] border-orange-500 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-extrabold text-orange-800 mb-6 text-center">Make a Donation</h2>
          
          {/* Quick Donation Presets */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Quick Donate:</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "🍚 5kg Rice", emoji: "🍚", type: "Food items", qty: "5kg Rice" },
                { label: "🥫 10 Cans", emoji: "🥫", type: "Food items", qty: "10 Cans" },
                { label: "🍞 20 Bread", emoji: "🍞", type: "Food items", qty: "20 Bread loaves" },
                { label: "🍲 5 Meals", emoji: "🍲", type: "Cooked meals", qty: "5 Meals" }
              ].map((preset, i) => (
                <button
                  key={i}
                  onClick={() => setFormData({...formData, donationType: preset.type, quantity: preset.qty})}
                  className="bg-white hover:bg-gray-100 px-3 py-1 rounded-full text-sm transition-colors border border-gray-200"
                >
                  {preset.emoji} {preset.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">What are you donating?</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select type</option>
                <option value="Food items">Food items</option>
                <option value="Cooked meals">Cooked meals</option>
                <option value="Groceries">Groceries</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantity/Description</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 5 kg rice and vegetables"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Pickup Scheduling */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <span>📅</span> Schedule Pickup
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'Wed'].map((day, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toast.info(`Pickup scheduled for ${day}, 2-5 PM`)}
                    className="bg-white p-2 rounded-lg border-2 border-blue-200 hover:border-blue-500 transition-colors"
                  >
                    <div className="font-bold text-sm">{day}</div>
                    <div className="text-xs">2-5 PM</div>
                  </button>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">
                ⏱️ Estimated pickup time: 15-30 mins
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Why are you donating? (Optional)</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="e.g., Reduce waste, Help community"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Feedback on our service (Optional)</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="How can we improve?"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-105"
            >
              Submit Donation
            </button>
          </form>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-extrabold text-emerald-900 text-center mb-8">Recent Donations & Impact</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-sky-100 via-white to-sky-50 border-l-[6px] border-sky-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
            >
              <p className="text-gray-700 text-lg leading-relaxed">{testimonial}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Donations Feed */}
      <div className="max-w-4xl mx-auto mb-12" data-aos="fade-up">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>📢</span> Live Donation Feed
        </h3>
        <div className="space-y-4">
          {liveDonations.map((donation, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                {donation.initial}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold">{donation.name}</span>
                  <span className="text-xs text-gray-500">{donation.time}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Donated: <span className="font-medium text-emerald-600">{donation.items}</span>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                  {donation.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Safety Tips Carousel */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6" data-aos="fade-up">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">✨</span> Food Safety Tips
        </h3>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-orange-300">
          {[
            { tip: "Keep hot food hot (above 60°C)", icon: "🌡️" },
            { tip: "Pack raw and cooked separately", icon: "📦" },
            { tip: "Label with date and contents", icon: "🏷️" },
            { tip: "Use clean, sealed containers", icon: "🧼" },
            { tip: "Donate within 2 hours of cooking", icon: "⏰" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl min-w-[220px] shadow flex-shrink-0">
              <span className="text-4xl mb-2 block">{item.icon}</span>
              <p className="text-sm font-medium text-gray-800">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add this CSS to your global styles or in a style tag */}
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
}

export default DonorPanel;