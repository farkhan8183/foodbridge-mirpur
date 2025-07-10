import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Vollogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  // Signup states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('');
  const [skills, setSkills] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnic, setCnic] = useState('');
  const [department, setDepartment] = useState('');
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
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
        if (result.success && result.logged_in && result.user.role === 'volunteer') {
          console.log('Volunteer already logged in:', result.user);
          navigate('/volunteerpanel');
          return;
        }
      }
    } catch (error) {
      console.log('Session check failed:', error);
    } finally {
      setCheckingSession(false);
    }
  }

  function handleSignup() {
    // Clear all fields when Sign Up is pressed
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setAvailability('');
    setSkills('');
    setPassword('');
    setConfirmPassword('');
    setCnic('');
    setDepartment('');
  }

  // Login function
  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
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
          role: "volunteer"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Login successful:', result.user);
        alert('Login successful!');
        navigate('/volunteerpanel');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
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

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!fullName || !email || !phone || !city || !availability || !password || !confirmPassword || !cnic) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/volunteersignup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          role: 'volunteer',
          department: department || ' ', // Send space if empty
          contact: phone,
          relevantSkill: skills || ' ', // Send space if empty
          availability: availability,
          city: city,
          cnic: cnic
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Volunteer signup successful!');
        handleSignup(); // Clear form
        setLogin(true); // Switch to login view
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-yellow-100">
        <div className="text-lg font-semibold">Checking session...</div>
      </div>
    );
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
            onClick={() => handleToggle(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
              !login
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-green-700'
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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right mt-2 text-sm text-green-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`mt-5 w-full py-2 rounded-lg font-semibold shadow-md cursor-pointer text-white ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-700 hover:bg-green-900'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="mt-4 text-sm text-center">
              Not a member?{' '}
              <span
                onClick={() => handleToggle(false)}
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

            <form onSubmit={handleSubmitSignup} className="flex flex-col gap-4">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="Full Name *"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="email"
                placeholder="Email *"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="tel"
                placeholder="Phone Number *"
                required
              />
              <input
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="CNIC *"
                required
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="City *"
                required
              />
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Availability *</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="anytime">Anytime</option>
              </select>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="Department (optional)"
              />
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
                placeholder="Password *"
                required
              />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-yellow-400"
                type="password"
                placeholder="Confirm Password *"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold shadow-md cursor-pointer"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-sm text-center">
              Already a member?{' '}
              <span
                onClick={() => handleToggle(true)}
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