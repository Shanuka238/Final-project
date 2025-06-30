import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    email: "user@partynest.com",
    password: "PartyNest123!",
    adminEmail: "admin@partynest.com",
    adminPassword: "Admin123!"
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const { email, password } = formData;
      
      if ((email === mockCredentials.email && password === mockCredentials.password) ||
          (email === mockCredentials.adminEmail && password === mockCredentials.adminPassword)) {
        
        // Store authentication data
        const userData = {
          name: email === mockCredentials.adminEmail ? 'Admin User' : 'John Doe',
          email: email,
          role: email === mockCredentials.adminEmail ? 'admin' : 'user',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        navigate('/user-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use: ${mockCredentials.email} / ${mockCredentials.password} or ${mockCredentials.adminEmail} / ${mockCredentials.adminPassword}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      const userData = {
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      navigate('/user-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Navigation */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/landing-page" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-primary transition-transform duration-200 group-hover:scale-105">
                <Icon name="Sparkles" size={24} color="white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-primary group-hover:text-primary-700 transition-colors duration-200">
                  Party Nest
                </span>
                <span className="font-body text-xs text-text-secondary -mt-1">
                  Premium Events
                </span>
              </div>
            </Link>
            
            <Link
              to="/landing-page"
              className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
            >
              <Icon name="ArrowLeft" size={18} strokeWidth={2} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-primary">
                <Icon name="LogIn" size={32} color="white" strokeWidth={2} />
              </div>
              <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
                Welcome Back
              </h1>
              <p className="text-text-secondary">
                Sign in to access your Party Nest dashboard
              </p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-error-600 mt-0.5" strokeWidth={2} />
                  <div>
                    <p className="text-sm font-medium text-error-800 mb-1">Authentication Failed</p>
                    <p className="text-sm text-error-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Mail" size={20} className="text-text-secondary" strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`input-field pl-10 ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={16} strokeWidth={2} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Lock" size={20} className="text-text-secondary" strokeWidth={2} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`input-field pl-10 pr-10 ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors duration-200"
                  >
                    <Icon 
                      name={showPassword ? "EyeOff" : "Eye"} 
                      size={20} 
                      className="text-text-secondary hover:text-primary" 
                      strokeWidth={2} 
                    />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={16} strokeWidth={2} />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="h-4 w-4 text-primary focus:ring-primary-500 border-border rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-text-secondary">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={20} strokeWidth={2} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-border rounded-lg bg-surface text-text-primary hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-border rounded-lg bg-surface text-text-primary hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium">Facebook</span>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-text-secondary">
                New to Party Nest?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary-600 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-sm font-medium text-primary-800 mb-2">Demo Credentials</p>
                <div className="text-sm text-primary-700 space-y-1">
                  <p><strong>User:</strong> {mockCredentials.email} / {mockCredentials.password}</p>
                  <p><strong>Admin:</strong> {mockCredentials.adminEmail} / {mockCredentials.adminPassword}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;