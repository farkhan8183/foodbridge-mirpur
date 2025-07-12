import React, { useState, useEffect } from 'react';

const Reclogin = () => {
  // Note: This component needs react-router-dom for navigation
  // Replace the navigate function with your router implementation
  const navigate = (path) => {
    console.log('Navigate to:', path);
    window.location.href = path;
  };
  const [isSignup, setIsSignup] = useState(true);
  
  // Simplified signup form data
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    dailyNeed: '',
    password: '',
    confirmPassword: ''
  });
  
  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes for signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Toggle between login and signup mode
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setSuccess('');
    // Clear forms when switching modes
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      dailyNeed: '',
      password: '',
      confirmPassword: ''
    });
    setLoginData({ email: '', password: '' });
  };

  // Simple validation function
  const validateForm = () => {
    if (!formData.organizationName.trim()) return 'Organization name is required';
    if (!formData.contactPerson.trim()) return 'Contact person is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.address.trim()) return 'Address is required';
    if (!formData.dailyNeed) return 'Daily need is required';
    if (!formData.password) return 'Password is required';
    if (!formData.confirmPassword) return 'Please confirm password';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email';

    // Password validation
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';

    // Phone validation (simplified - allow 10-15 digits)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      return 'Phone number must be 10-15 digits';
    }

    // Daily need validation
    const dailyNeedNum = parseInt(formData.dailyNeed);
    if (isNaN(dailyNeedNum) || dailyNeedNum <= 0) return 'Daily need must be a positive number';

    return null;
  };

  // Handle signup
  const handleSignup = async () => {
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Clean phone number - remove all non-digits and limit length
      const cleanPhone = formData.phone.replace(/\D/g, '').substring(0, 15);
      
      // Prepare data for backend
      const requestData = {
        organizationName: formData.organizationName.trim(),
        contactPerson: formData.contactPerson.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: cleanPhone,
        address: formData.address.trim(),
        dailyNeed: parseInt(formData.dailyNeed),
        password: formData.password,
        role: "recipient"
      };

      console.log('Sending signup request:', { ...requestData, password: '[HIDDEN]' });

      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/recipientsignup.php", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });

      console.log('Response status:', response.status);
      
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('Invalid response from server');
      }

      console.log('Response data:', result);

      if (result.success) {
        setSuccess('Registration successful! You can now login.');
        // Clear form
        setFormData({
          organizationName: '',
          contactPerson: '',
          email: '',
          phone: '',
          address: '',
          dailyNeed: '',
          password: '',
          confirmPassword: ''
        });
        // Auto-switch to login after 2 seconds
        setTimeout(() => {
          setIsSignup(false);
          setSuccess('');
        }, 2000);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleLogin = async () => {
    
    if (!loginData.email.trim() || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const requestData = {
        email: loginData.email.trim().toLowerCase(),
        password: loginData.password,
        role: "recipient"
      };

      console.log('Sending login request');

      const response = await fetch("http://localhost/FSWD/foodbridge-mirpur/foodbridge-Backend/login.php", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });
      
      console.log('Login response status:', response.status);

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('Invalid response from server');
      }

      console.log('Login response:', result);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/recipientpanel');
        }, 1000);
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignup ? 'Join FoodBridge' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isSignup ? 'Register as a recipient organization' : 'Sign in to your account'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Forms */}
        {isSignup ? (
          // Signup Form
          <div onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name *
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleSignupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter organization name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleSignupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter contact person name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleSignupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleSignupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter phone number (digits only)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleSignupChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                placeholder="Enter full address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Need (People) *
              </label>
              <input
                type="number"
                name="dailyNeed"
                value={formData.dailyNeed}
                onChange={handleSignupChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Number of people served daily"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleSignupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleSignupChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleSignup}
              disabled={isLoading}
              className={`w-full py-2.5 rounded-lg font-semibold text-white ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              } transition-colors`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        ) : (
          // Login Form
          <div onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-2.5 rounded-lg font-semibold text-white ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              } transition-colors`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        )}

        {/* Toggle between login/signup */}
        <div className="text-center mt-6">
          <button
            onClick={toggleMode}
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            {isSignup ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reclogin;