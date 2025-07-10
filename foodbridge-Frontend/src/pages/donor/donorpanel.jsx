import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const DonorPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  // Check if user session exists
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
          setUser(result.user);
          console.log("Set user:", result.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setIsLoggedIn(false);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  // Not logged in - show access denied
  if (!isLoggedIn || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the donor panel.
          </p>
          <button 
            onClick={() => window.location.href = '/donorlogin'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // User is logged in - show dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🍽️ FoodBridge Donor Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-600">Welcome, </span>
                <span className="font-semibold text-gray-900">{user.name}</span>
                {/* <span className="text-gray-500 ml-2">({user.donor_type})</span> */}
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
                🎉 Welcome to your FoodBridge Dashboard!
              </h2>
              <p className="text-gray-600">
                You're successfully logged in with session authentication. From here you can manage your donations, view your impact, and connect with recipients.
              </p>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                👤 Profile Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Donor ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">#{user.data?.id}</dd>
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
                  <dt className="text-sm font-medium text-gray-500">Donor Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{user.data?.donor_type}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Donate Food Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">🍽️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Donate Food
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Share surplus food
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
            

                <Link to="/createdonation">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Create Donation
                  </button>
                </Link>

                </div>
              </div>
            </div>

            {/* View Donations Card */}
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
                        My Donations
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        View history
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Donations
                  </button>
                </div>
              </div>
            </div>

            {/* Impact Stats Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Impact Stats
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        See your impact
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Impact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-green-50 overflow-hidden shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-green-800 mb-4">
                ✅ Session Status
              </h3>
              <div className="text-sm text-green-700">
                <p>🔐 You are securely logged in with PHP session authentication</p>
                <p>🚀 Your session is active and protected</p>
                <p>🔄 Session will be checked automatically</p>
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
                <div className="text-4xl mb-4">🌟</div>
                <p className="text-gray-500">No recent activity to display.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Start by creating your first donation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorPanel;