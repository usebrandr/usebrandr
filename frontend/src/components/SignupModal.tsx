import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, Briefcase, User, AlertCircle } from 'lucide-react';
import { api } from '../utils/api';

interface SignupModalProps {
  onClose: () => void;
  onSignup: (userType: 'business' | 'influencer') => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSignup }) => {
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await api.auth.signup({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        user_type: userType
      });

      if (response.data) {
        setIsSuccess(true);
        setTimeout(() => {
          onSignup(userType);
        }, 1500);
      } else {
        // Handle specific error cases
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

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-[#f5f5f5]/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-[#f5f5f5]">Account Created!</h2>
            <p className="text-[#f5f5f5]/70 mb-6 text-base leading-relaxed">
              Welcome to Brandr! You're being redirected to your dashboard.
            </p>
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
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-md relative border border-[#f5f5f5]/10 overflow-hidden">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-[#2a2a2a] pt-5 px-5 border-b border-[#f5f5f5]/10 z-10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full hover:bg-[#f5f5f5]/10 transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-[#f5f5f5]" />
          </button>

          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-1">
              Create your account
            </h2>
            <p className="text-[#f5f5f5]/70 text-sm">
              Get started as a {userType === 'business' ? 'business' : 'creator'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* User Type Toggle */}
          <div className="flex bg-[#1c1c1c] rounded-lg p-1 mb-6">
            <button
              onClick={() => setUserType('business')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md font-medium transition-all ${
                userType === 'business'
                  ? 'bg-[#f5f5f5] text-[#1c1c1c] shadow-sm'
                  : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">Business</span>
            </button>
            <button
              onClick={() => setUserType('influencer')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md font-medium transition-all ${
                userType === 'influencer'
                  ? 'bg-[#f5f5f5] text-[#1c1c1c] shadow-sm'
                  : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5]'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Creator</span>
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Username"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pl-10 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f5f5f5]/50" />
            </div>

            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email address"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pl-10 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f5f5f5]/50" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Password"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pl-10 pr-10 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f5f5f5]/50" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f5f5f5]/50 hover:text-[#f5f5f5]/70 p-0.5"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm password"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pl-10 pr-10 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50 disabled:opacity-50 text-sm"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#f5f5f5]/50" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f5f5f5]/50 hover:text-[#f5f5f5]/70 p-0.5"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f5f5f5] text-[#1c1c1c] py-3 px-4 rounded-lg font-semibold hover:bg-[#e5e5e5] transition-all duration-200 shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#f5f5f5] disabled:hover:shadow text-sm mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-[#1c1c1c]/30 border-t-[#1c1c1c] rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-[#f5f5f5]/50 text-xs leading-relaxed">
              By creating an account, you agree to our{' '}
              <span className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;