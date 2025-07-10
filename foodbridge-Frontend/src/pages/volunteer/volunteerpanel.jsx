import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const VolunteerPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  
  // Add useNavigate hook inside the component
  const nav = useNavigate();

  // Add function to navigate to home
  const backtohome = () => {
    nav("/");
  }

  useEffect(() => {
    checkSession();
  }, []);

  // Check if user session exists and is a volunteer
  async function checkSession() {
    try {
      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/checksession.php", {
        method: "GET",
        credentials: 'include', // Important: Include cookies/session
        headers: { 
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.logged_in) {
          // Check if user is a volunteer
          if (result.user.role === 'volunteer' || result.user.data?.role === 'volunteer') {
            setUser(result.user);
            console.log("Set volunteer user:", result.user);
            setIsLoggedIn(true);
            setIsVolunteer(true);
          } else {
            // User is logged in but not a volunteer
            setIsLoggedIn(true);
            setIsVolunteer(false);
          }
        } else {
          setIsLoggedIn(false);
          setIsVolunteer(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsVolunteer(false);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setIsLoggedIn(false);
      setIsVolunteer(false);
    } finally {
      setLoading(false);
    }
  }

  // Logout function
  async function handleLogout() {
    try {
      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/logout.php", {
        method: "POST",
        credentials: 'include',
        headers: { 
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('Logged out successfully!');
          setUser(null);
          setIsLoggedIn(false);
          setIsVolunteer(false);
          // In a real app, this would redirect to login page
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  // Not logged in - show access denied
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the volunteer panel.
          </p>
          <button 
            onClick={() => window.location.href = '/volunteerlogin'}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Logged in but not a volunteer - show unauthorized access
  if (isLoggedIn && !isVolunteer) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Unauthorized Access</h2>
          <p className="text-gray-600 mb-6">
            You are logged in but don't have volunteer privileges to access this panel.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/donorpanel'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Go to Donor Panel
            </button>
            <button 
              onClick={handleLogout}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is logged in and is a volunteer - show dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Added clickable home navigation */}
              <h1 
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
                onClick={backtohome}
              >
                🤝 FoodBridge Volunteer Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-600">Welcome, </span>
                <span className="font-semibold text-gray-900">{user.name}</span>
                <span className="text-green-600 ml-2 px-2 py-1 bg-green-100 rounded-full text-xs">VOLUNTEER</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                🌟 Welcome to your Volunteer Dashboard!
              </h2>
              <p className="text-gray-600">
                Thank you for volunteering with FoodBridge! From here you can manage pickup assignments, coordinate deliveries, and track your volunteer impact.
              </p>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                👤 Volunteer Profile
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Volunteer ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">#{user.data?.ID}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {user.data?.role || 'Food Volunteer'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Available Pickups Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Available Pickups
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Food ready for pickup
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/available-pickups">
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      View Pickups
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* My Assignments Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🚚</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        My Assignments
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Active deliveries
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/my-assignments">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      View Assignments
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Volunteer Stats Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🏆</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        My Impact
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Volunteer stats
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/volunteer-stats">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      View Stats
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-green-50 overflow-hidden shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-green-800 mb-4">
                ✅ Volunteer Session Status
              </h3>
              <div className="text-sm text-green-700">
                <p>🔐 You are securely logged in as a volunteer</p>
                <p>🤝 Your volunteer session is active and protected</p>
                <p>🔄 Session validation ensures proper access control</p>
              </div>
            </div>
          </div>

          {/* Recent Volunteer Activity */}
          <div className="bg-white overflow-hidden shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                📋 Recent Volunteer Activity
              </h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🤝</div>
                <p className="text-gray-500">No recent volunteer activity to display.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Start by checking available pickups or assignments!
                </p>
              </div>
            </div>
          </div>

          {/* Volunteer Quick Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Total Pickups</div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">🚚</div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Completed Deliveries</div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Volunteer Hours</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerPanel;