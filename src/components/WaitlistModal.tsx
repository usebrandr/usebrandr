import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Briefcase, User } from 'lucide-react';
import BrandrLogo from './BrandrLogo';

interface WaitlistModalProps {
  onClose: () => void;
  userType: 'business' | 'influencer';
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ onClose, userType }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [currentUserType, setCurrentUserType] = useState(userType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Use direct API with CORS mode
    const isDevelopment = window.location.hostname === 'localhost';
    const apiUrl = isDevelopment 
      ? 'http://localhost:3001/api/waitlist'
      : 'https://brand-api-sxnu.onrender.com/api/waitlist';

    try {
      console.log('Attempting to connect to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userType: currentUserType,
        }),
      });

      const errorData = await response.json().catch(() => ({}));
      
      if (response.ok || response.status === 409) {
        // 409 means email already registered, which is fine
        setIsSubmitted(true);
      } else {
        console.error('API Error:', errorData);
        
        // If it's a database configuration error, show a specific message
        if (errorData.error === 'Database not configured') {
          setError('Service temporarily unavailable. Please try again later.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#1c1c1c]/90 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <BrandrLogo size="md" variant="white" />
          <div className="flex justify-between items-center w-full mt-4">
            <h2 className="text-2xl font-bold text-[#f5f5f5]">Join the Waitlist</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#f5f5f5] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#f5f5f5] mb-2">
                I'm a {currentUserType === 'business' ? 'Business' : 'Creator'}
              </label>
              <div className="flex bg-[#1c1c1c] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setCurrentUserType('business')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
                    currentUserType === 'business'
                      ? 'bg-[#3B82F6] text-white shadow-md'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Business</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentUserType('influencer')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
                    currentUserType === 'influencer'
                      ? 'bg-[#3B82F6] text-white shadow-md'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Creator</span>
                </button>
              </div>
            </div>

              <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#f5f5f5] mb-2">
                Email Address
              </label>
                <input
                  type="email"
                id="email"
                  value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200 text-[#f5f5f5] placeholder-gray-400"
                placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
              disabled={isLoading}
              className="w-full bg-[#3B82F6] text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
              {isLoading ? 'Joining...' : 'Join Waitlist'}
            </button>

            {error && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
                  </div>
                )}
            </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-[#f5f5f5]">You're on the list!</h3>
                                      <p className="text-gray-300">
                            We'll notify you as soon as {currentUserType === 'business' ? 'business' : 'creator'} access is available.
                          </p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#3B82F6] text-white py-2 px-6 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;