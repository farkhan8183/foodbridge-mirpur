import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vollogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState(''); //imp=>drop down logic!!
  const [skills, setSkills] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSignup() {
    /// Clear all fields when Sign Up is pressed
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setAvailability('');
    setSkills('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-yellow-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 mr-2 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
              login
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-green-700'
            }`}
            onClick={() => setLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
              !login
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-green-700'
            }`}
            onClick={() => setLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Login Form */}
        {login ? (
          <div>
            <h1 className="text-xl font-bold text-center text-green-700 mb-2">Welcome Back!</h1>
            <p className="text-center text-sm text-gray-500 mb-4">Login to Volunteer 🚀</p>

            <div className="flex flex-col gap-4">
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
                type="email"
                placeholder="Email"
              />
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="text-right mt-2 text-sm text-green-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-5 w-full bg-green-700 hover:bg-green-900 text-white py-2 rounded-lg font-semibold shadow-md cursor-pointer"
            >
              Login
            </button>

            <div className="mt-4 text-sm text-center">
              Not a member?{' '}
              <span
                onClick={() => setLogin(false)}
                className="text-green-700 font-medium hover:underline cursor-pointer"
              >
                Sign up Now
              </span>
            </div>
          </div>
        ) : (
          // Signup Form
          <div>
            <h1 className="text-xl font-bold text-center text-yellow-600 mb-2">Become a Volunteer!</h1>
            <p className="text-center text-sm text-gray-500 mb-4">Join us and make an impact 💪</p>

            <div className="flex flex-col gap-4">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="Full Name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="email"
                placeholder="Email"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="tel"
                placeholder="Phone Number"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="City"
              />
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="anytime">Anytime</option>
              </select>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="Relevant Skills (optional)"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="password"
                placeholder="Password"
              />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <button
              className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold shadow-md cursor-pointer"
              onClick={handleSignup}
            >
              Sign Up
            </button>

            <div className="mt-4 text-sm text-center">
              Already a member?{' '}
              <span
                onClick={() => setLogin(true)}
                className="text-yellow-600 font-medium hover:underline cursor-pointer"
              >
                Login
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vollogin;
