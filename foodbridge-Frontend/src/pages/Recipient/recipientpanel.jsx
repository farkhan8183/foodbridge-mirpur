import React, { useState, useEffect } from 'react';

const RecipientPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecipient, setIsRecipient] = useState(false);
  
  // Navigation function (replace with your router implementation)
  const backtohome = () => {
    console.log('Navigate to home');
     window.location.href = '/';
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Check if user session exists and is a recipient
  async function checkSession() {
    try {
      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/checksession.php", {
        method: "GET",
        credentials: 'include',
        headers: { 
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.logged_in) {
          // Check if user is a recipient
          if (result.user.role === 'recipient' || result.user.data?.role === 'recipient') {
            setUser(result.user);
            console.log("Set recipient user:", result.user);
            setIsLoggedIn(true);
            setIsRecipient(true);
          } else {
            // User is logged in but not a recipient
            setIsLoggedIn(true);
            setIsRecipient(false);
          }
        } else {
          setIsLoggedIn(false);
          setIsRecipient(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsRecipient(false);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setIsLoggedIn(false);
      setIsRecipient(false);
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
          setIsRecipient(false);
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
            You need to be logged in to access the recipient panel.
          </p>
          <button 
            onClick={() => window.location.href = '/reclogin'}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Logged in but not a recipient - show unauthorized access
  if (isLoggedIn && !isRecipient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Unauthorized Access</h2>
          <p className="text-gray-600 mb-6">
            You are logged in but don't have recipient privileges to access this panel.
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

  // User is logged in and is a recipient - show dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
                onClick={backtohome}
              > 
                🤝 FoodBridge Recipient Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-600">Welcome, </span>
                <span className="font-semibold text-gray-900">{user.name}</span>
                <span className="text-green-600 ml-2 px-2 py-1 bg-green-100 rounded-full text-xs">RECIPIENT</span>
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
                🙏 Welcome to your FoodBridge Dashboard!
              </h2>
              <p className="text-gray-600">
                Thank you for being part of FoodBridge! Here you can browse available donations, manage requests, and coordinate food pickups.
              </p>
            </div>
          </div>

          {/* Organization Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                🏢 Organization Profile
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Organization ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">#{user.data?.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Organization Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.data?.contact_person || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Daily Need</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {user.data?.daily_need || 0} people
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.data?.contact || 'Not provided'}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Browse Donations Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🔍</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Browse Donations
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Find available food
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => console.log('Navigate to browse donations')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Browse Food
                  </button>
                </div>
              </div>
            </div>

            {/* My Requests Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📋</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        My Requests
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        View requests
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => console.log('Navigate to my requests')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    View Requests
                  </button>
                </div>
              </div>
            </div>

            {/* Pickup Schedule Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pickup Schedule
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Manage pickups
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => console.log('Navigate to pickup schedule')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    View Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-green-50 overflow-hidden shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-green-800 mb-4">
                ✅ Recipient Session Status
              </h3>
              <div className="text-sm text-green-700">
                <p>🔐 You are securely logged in as a recipient organization</p>
                <p>🤝 Your recipient session is active and protected</p>
                <p>🔄 Session validation ensures proper access control</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white overflow-hidden shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                📈 Recent Activity
              </h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🤝</div>
                <p className="text-gray-500">No recent activity to display.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Start by browsing available donations!
                </p>
              </div>
            </div>
          </div>

          {/* Recipient Quick Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Food Received</div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-gray-900">{user.data?.daily_need || 0}</div>
                <div className="text-sm text-gray-500">People Served Daily</div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Active Requests</div>
              </div>
            </div>
          </div>

          {/* Organization Details */}
          <div className="bg-white overflow-hidden shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                📍 Organization Details
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.data?.address || 'Address not provided'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                  <div className="mt-1 text-sm text-gray-900 space-y-1">
                    <p>📧 {user.email}</p>
                    {user.data?.contact && <p>📞 {user.data.contact}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipientPanel;