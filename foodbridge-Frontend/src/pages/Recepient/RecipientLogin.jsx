import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reclogin = () => {
  // Manage mode: true = Sign Up, false = Login
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);

  // Store input field data
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
  });

  // Switch between login and signup mode
  const toggleMode = () => setIsSignup(!isSignup);

  // Handle changes in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });//(It keeps all old values in formData (...formData)  ,   It updates only the one field that was changed.)
  };

  // When user clicks Sign Up
  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Recipient Sign Up Data:', formData);

    // Clear all input fields after signup
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  // When user clicks Login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Recipient Login:', {
      email: formData.email,
      password: formData.password,
    });

    // Optional: clear login inputs if needed
    // setFormData({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-yellow-100 px-6 py-16">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">
          {isSignup ? 'Recipient Sign Up' : 'Recipient Login'}
        </h2>

        {/* Form submission based on mode */}
        <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-5">
          {/* These fields only show when signing up */}
          {isSignup && (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Enter contact person's name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
            </>
          )}

          {/* Email input */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-6 rounded-lg w-full transition duration-300"
          >
            {isSignup ? 'Sign Up' : <p   onClick={() => navigate('/')}>Login</p>}
          </button>
        </form>

        {/* Switch between login/signup */}
        <p className="text-sm text-center mt-4 text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="text-emerald-700 font-medium hover:underline focus:outline-none"
          >
            {isSignup ? 'Login here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Reclogin;
