//note: trippl  ///comments shows logic of  clearin fileds  on  clickin sign  up
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [donorType, setDonorType] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');        /// Added phone state
  const [address, setAddress] = useState('');    /// Added address state
  const [regId, setRegId] = useState('');        /// Added org regId state
  const [items, setItems] = useState('');        /// Added restaurant item state
  const [password, setPassword] = useState('');  /// Added password state
  const [confirmPassword, setConfirmPassword] = useState(''); /// Added confirm password state

  function handlesignup() {
    /// Reset all signup fields on Sign Up button click
    setname('');
    setemail('');
    setPhone('');
    setAddress('');
    setDonorType('');
    setRegId('');
    setItems('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 mr-2 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
              login
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-blue-700'
            }`}
            onClick={() => setLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200  cursor-pointer ${
              !login
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-blue-700'
            }`}
            onClick={() => setLogin(false)}
          >
            Signup
          </button>
        </div>

        {/* Login */}
        {login ? (
          <div>
            <h1 className="text-xl font-bold text-center text-blue-700 mb-2">Welcome Back!</h1>
            <p className="text-center text-sm text-gray-500 mb-4">Login to FoodBridge 🚀</p>

            <div className="flex flex-col gap-4">
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
                type="email"
                placeholder="Email"
              />
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="text-right mt-2 text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-5 w-full bg-blue-700 hover:bg-blue-900 text-white py-2 rounded-lg font-semibold shadow-md cursor-pointer"
            >
              Login
            </button>

            <div className="mt-4 text-sm text-center">
              Not a member?{' '}
              <span
                onClick={() => setLogin(false)}
                className="text-blue-700 font-medium hover:underline cursor-pointer"
              >
                Sign up Now
              </span>
            </div>
          </div>
        ) : (
          // Signup
          <div>
            <h1 className="text-xl font-bold text-center text-pink-600 mb-2">Join FoodBridge!</h1>
            <p className="text-center text-sm text-gray-500 mb-4">Sign up to donate and support 💚</p>

            <div className="flex flex-col gap-4">
              <input value={name} onChange={(e) => setname(e.target.value)} /// name
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="text"
                placeholder="Your / Organization Name"
              />
              <input value={email} onChange={(e) => setemail(e.target.value)} /// email
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="email"
                placeholder="Email"
              />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} /// phone
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="tel"
                placeholder="Phone Number"
              />
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} /// address
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Address"
              ></textarea>

              {/* Donor Type Dropdown */}
              <select
                value={donorType}
                onChange={(e) => setDonorType(e.target.value)} /// donorType
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select Donor Type</option>
                <option value="person">Individual</option>
                <option value="restaurant">Restaurant</option>
                <option value="organization">Organization</option>
              </select>

              {/* Conditional Fields */}
              {donorType === 'restaurant' && (
                <input value={items} onChange={(e) => setItems(e.target.value)} /// restaurant
                  className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                  type="text"
                  placeholder="Usual Donation Items (e.g., Food, Water)"
                />
              )}
              {donorType === 'organization' && (
                <input value={regId} onChange={(e) => setRegId(e.target.value)} /// org regId
                  className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                  type="text"
                  placeholder="Registration No / ID"
                />
              )}

              <input value={password} onChange={(e) => setPassword(e.target.value)} /// password
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="password"
                placeholder="Password"
              />
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /// confirm password
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <button
              className="mt-5 w-full bg-pink-600 hover:bg-pink-800 text-white py-2 rounded-lg font-semibold shadow-md cursor-pointer"
              onClick={handlesignup} /// Clear fields here
            >
              Sign Up
            </button>

            <div className="mt-4 text-sm text-center">
              Already a member?{' '}
              <span
                onClick={() => setLogin(true)}
                className="text-pink-700 font-medium hover:underline cursor-pointer"
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

export default Login;
