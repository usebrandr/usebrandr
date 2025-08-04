import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Briefcase, User, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../utils/api';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userType: 'business' | 'influencer') => void;
  onSignup: (userType: 'business' | 'influencer') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSignupInputChange = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const validateLoginForm = () => {
    if (!loginData.username.trim()) {
      setError('Username or email is required');
      return false;
    }
    if (!loginData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const validateSignupForm = () => {
    if (!signupData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!signupData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!signupData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await api.auth.login({
        username: loginData.username.trim(),
        password: loginData.password,
        user_type: userType
      });

      if (response.data) {
        setSuccess('Login successful!');
        setTimeout(() => {
          onLogin(response.data?.user?.user_type as 'business' | 'influencer');
        }, 1000);
      } else {
        setError(response.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignupForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await api.auth.signup({
        username: signupData.username.trim(),
        email: signupData.email.trim(),
        password: signupData.password,
        confirm_password: signupData.confirmPassword,
        user_type: userType
      });

      if (response.data) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onSignup(userType);
        }, 1500);
      } else {
        if (response.error?.includes('username')) {
          setError('Username already exists');
        } else if (response.error?.includes('email')) {
          setError('Email already exists');
        } else {
          setError(response.error || 'Failed to create account. Please try again.');
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setLoginData({ username: '', password: '' });
    setSignupData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-sm p-8 relative border border-[#f5f5f5]/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-[#f5f5f5]">
              {isLogin ? 'Welcome back!' : 'Account Created!'}
            </h2>
            <p className="text-[#f5f5f5]/70 mb-6">{success}</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[#f5f5f5]/50 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#f5f5f5]/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[#f5f5f5]/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8 relative border border-[#f5f5f5]/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f5f5f5]/10 transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5 text-[#f5f5f5]" />
        </button>

        {/* User Type Toggle - Simplified */}
        <div className="flex bg-[#1c1c1c] rounded-xl p-1 mb-6">
          <button
            onClick={() => setUserType('influencer')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 sm:px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
              userType === 'influencer'
                ? 'bg-[#f5f5f5] text-[#1c1c1c] shadow-sm'
                : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Creator</span>
          </button>
          <button
            onClick={() => setUserType('business')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 sm:px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
              userType === 'business'
                ? 'bg-[#f5f5f5] text-[#1c1c1c] shadow-sm'
                : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Business</span>
          </button>
        </div>

        {/* Header - Simplified */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[#f5f5f5]">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-[#f5f5f5]/70 text-sm sm:text-base">
            {isLogin
              ? `Sign in to your ${userType} account`
              : `Get started as a ${userType}`
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                value={signupData.username}
                onChange={(e) => handleSignupInputChange('username', e.target.value)}
                placeholder="Username"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent pl-12 placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm sm:text-base"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f5f5f5]/50" />
            </div>
          )}

          <div className="relative">
            <input
              type={isLogin ? "text" : "email"}
              value={isLogin ? loginData.username : signupData.email}
              onChange={(e) => isLogin
                ? handleLoginInputChange('username', e.target.value)
                : handleSignupInputChange('email', e.target.value)
              }
              placeholder={isLogin ? "Username or email" : "Email address"}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent pl-12 placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm sm:text-base"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f5f5f5]/50" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={isLogin ? loginData.password : signupData.password}
              onChange={(e) => isLogin
                ? handleLoginInputChange('password', e.target.value)
                : handleSignupInputChange('password', e.target.value)
              }
              placeholder="Password"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent pl-12 pr-12 placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm sm:text-base"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f5f5f5]/50" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f5f5f5]/50 hover:text-[#f5f5f5]/70"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={signupData.confirmPassword}
                onChange={(e) => handleSignupInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm password"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent pl-12 pr-12 placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm sm:text-base"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f5f5f5]/50" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f5f5f5]/50 hover:text-[#f5f5f5]/70"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f5f5f5] text-[#1c1c1c] py-3 px-6 rounded-xl font-semibold hover:bg-[#e5e5e5] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#1c1c1c]/30 border-t-[#1c1c1c] rounded-full animate-spin"></div>
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-[#f5f5f5]/70 text-sm sm:text-base">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-1 text-[#f5f5f5] hover:text-[#f5f5f5]/80 font-medium"
              disabled={isLoading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;