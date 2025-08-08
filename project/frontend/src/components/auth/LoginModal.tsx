import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle, Briefcase, Sparkles } from 'lucide-react';
import { authService } from '../../services/api';
import { User as UserType } from '../../types/auth';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
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
    password2: '',
    user_type: 'business' as 'business' | 'influencer'
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
      setError('Username is required');
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
    if (signupData.password !== signupData.password2) {
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
      const response = await authService.login({
        username: loginData.username.trim(),
        password: loginData.password
      });

      if (response.data) {
        setSuccess('Login successful!');
        setTimeout(() => {
          onLogin();
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
      const response = await authService.register({
        username: signupData.username.trim(),
        email: signupData.email.trim(),
        password: signupData.password,
        password2: signupData.password2,
        user_type: signupData.user_type
      });

      if (response.data) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onSignup();
        }, 1500);
      } else {
        setError(response.error || 'Failed to create account. Please try again.');
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
    setSignupData({ username: '', email: '', password: '', password2: '', user_type: 'business' });
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">
              {isLogin ? 'Welcome back!' : 'Account Created!'}
            </h2>
            <p className="text-gray-300 mb-6">{success}</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            {isLogin ? 'Welcome back' : 'Join Brandr'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        {/* User Type Toggle - Only show for signup */}
        {!isLogin && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">I am a...</label>
            <div className="flex bg-gray-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setSignupData(prev => ({ ...prev, user_type: 'business' }))}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  signupData.user_type === 'business'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Business</span>
              </button>
              <button
                type="button"
                onClick={() => setSignupData(prev => ({ ...prev, user_type: 'influencer' }))}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  signupData.user_type === 'influencer'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Creator</span>
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                value={signupData.username}
                onChange={(e) => handleSignupInputChange('username', e.target.value)}
                placeholder="Username"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 placeholder-gray-500 disabled:opacity-50"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
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
              placeholder={isLogin ? "Username" : "Email address"}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 placeholder-gray-500 disabled:opacity-50"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
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
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 pr-12 placeholder-gray-500 disabled:opacity-50"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={signupData.password2}
                onChange={(e) => handleSignupInputChange('password2', e.target.value)}
                placeholder="Confirm password"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 pr-12 placeholder-gray-500 disabled:opacity-50"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-1 text-blue-400 hover:text-blue-300 font-medium"
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