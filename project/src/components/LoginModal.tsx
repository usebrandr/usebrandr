import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Briefcase, User } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userType: 'business' | 'influencer') => void;
  onSignup: (userType: 'business' | 'influencer') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(userType);
    } else {
      onSignup(userType);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#f5f5f5]/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f5f5f5]/10 transition-colors"
        >
          <X className="w-5 h-5 text-[#f5f5f5]" />
        </button>

        {/* User Type Toggle */}
        <div className="flex bg-[#1c1c1c] rounded-xl p-1 mb-6">
          <button
            onClick={() => setUserType('influencer')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all ${
              userType === 'influencer'
                ? 'bg-[#f5f5f5] text-[#1c1c1c] shadow-sm'
                : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Influencer</span>
          </button>
          <button
            onClick={() => setUserType('business')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all ${
              userType === 'business'
                ? 'bg-[#f5f5f5] text-[#1c1c1c] shadow-sm'
                : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Business</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-[#f5f5f5]">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-[#f5f5f5]/70">
            {isLogin 
              ? `Sign in to your ${userType} account` 
              : `Get started as a ${userType}`
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent pl-12 placeholder-[#f5f5f5]/50"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f5f5f5]/50" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent pl-12 pr-12 placeholder-[#f5f5f5]/50"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f5f5f5]/50" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f5f5f5]/50 hover:text-[#f5f5f5]/70"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f5f5f5] text-[#1c1c1c] py-3 px-6 rounded-xl font-semibold hover:bg-[#e5e5e5] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f5f5f5]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#2a2a2a] text-[#f5f5f5]/70">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-3 px-4 border border-[#f5f5f5]/20 rounded-xl shadow-sm bg-[#1c1c1c] text-sm font-medium text-[#f5f5f5]/70 hover:bg-[#333] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            <button className="w-full inline-flex justify-center py-3 px-4 border border-[#f5f5f5]/20 rounded-xl shadow-sm bg-[#1c1c1c] text-sm font-medium text-[#f5f5f5]/70 hover:bg-[#333] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>

            <button className="w-full inline-flex justify-center py-3 px-4 border border-[#f5f5f5]/20 rounded-xl shadow-sm bg-[#1c1c1c] text-sm font-medium text-[#f5f5f5]/70 hover:bg-[#333] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#f5f5f5]/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-[#f5f5f5] hover:text-[#f5f5f5]/80 font-medium"
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