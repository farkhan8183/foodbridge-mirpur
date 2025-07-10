import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  
  // Signup states
  const [donorType, setDonorType] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  // Function to check if user is already logged in
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
        if (result.success && result.logged_in && result.user.role === 'donor') {
          console.log('Donor already logged in:', result.user);
          navigate('/donorpanel');
          return;
        }
      }
    } catch (error) {
      console.log('Session check failed:', error);
    } finally {
      setCheckingSession(false);
    }
  }

  // Login function
  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/login.php", {
        method: "POST",
        credentials: 'include',
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          role: "donor"
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Login successful:', result.user);
        alert('Login successful!');
        navigate('/donorpanel');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Signup function
  async function handlesignup() {
    if (!name || !email || !phone || !address || !donorType || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await submit();
      // Clear form on successful signup
      setname('');
      setemail('');
      setPhone('');
      setAddress('');
      setDonorType('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submit() {
    try {
      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/donorsignup.php", {
        method: "POST",
        credentials: 'include',
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
          donorType,
          role: "donor"
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.success) {
        alert('Signup successful! Please login.');
        setLogin(true);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please try again.');
    }
  }
  
  // Clear error when switching between login/signup
  const handleToggle = (isLoginMode) => {
    setLogin(isLoginMode);
    setError('');
    // Clear login form when switching to signup
    if (!isLoginMode) {
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
        <div className="text-lg font-semibold">Checking session...</div>
      </div>
    );
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
            onClick={() => handleToggle(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
              !login
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-blue-700'
            }`}
            onClick={() => handleToggle(false)}
          >
            Signup
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right mt-2 text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`mt-5 w-full py-2 rounded-lg font-semibold shadow-md cursor-pointer text-white ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-700 hover:bg-blue-900'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="mt-4 text-sm text-center">
              Not a member?{' '}
              <span
                onClick={() => handleToggle(false)}
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
              <input 
                value={name} 
                onChange={(e) => setname(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="text"
                placeholder="Your / Organization Name"
                required
              />
              <input 
                value={email} 
                onChange={(e) => setemail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="email"
                placeholder="Email"
                required
              />
              <input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="tel"
                placeholder="Phone Number"
                required
              />
              <textarea 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                placeholder="Address"
                required
              ></textarea>

              <select
                value={donorType}
                onChange={(e) => setDonorType(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                required
              >
                <option value="">Select Donor Type</option>
                <option value="person">Individual</option>
                <option value="restaurant">Restaurant</option>
                <option value="organization">Organization</option>
              </select>

              <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="password"
                placeholder="Password"
                required
              />
              <input 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-400"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>

            <button
              className={`mt-5 w-full py-2 rounded-lg font-semibold shadow-md cursor-pointer text-white ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-pink-600 hover:bg-pink-800'
              }`}
              onClick={handlesignup}
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <div className="mt-4 text-sm text-center">
              Already a member?{' '}
              <span
                onClick={() => handleToggle(true)}
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