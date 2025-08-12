import React, { useState } from 'react';
import { X, Mail, CheckCircle, Briefcase, User, AlertCircle } from 'lucide-react';

interface WaitlistModalProps {
  onClose: () => void;
  userType: 'business' | 'influencer';
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ onClose, userType }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Determine backend base URL
    const API_BASE =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : 'https://brand-api-sxnu.onrender.com';

    try {
      const response = await fetch(`${API_BASE}/api/waitlist/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          userType: userType === 'influencer' ? 'creator' : 'business',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          setError('This email is already on our waitlist!');
        } else if (response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else {
          setError(data.error || 'Failed to join waitlist. Please try again.');
        }
      }
    } catch (err) {
      console.error('Waitlist signup error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isInfluencer = userType === 'influencer';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#f5f5f5]/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f5f5f5]/10 transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5 text-[#f5f5f5]" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {isInfluencer ? (
                <User className="w-8 h-8 text-[#f5f5f5]" />
              ) : (
                <Briefcase className="w-8 h-8 text-[#f5f5f5]" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">
              Join the {isInfluencer ? 'Creator' : 'Business'} Waitlist
            </h2>
            <p className="text-[#f5f5f5]/70 text-center mb-8">
              {isInfluencer
                ? 'Be the first to know when we launch for creators. Get early access to brand partnerships.'
                : 'Be the first to know when we launch. Get early access to connect with top creators.'
              }
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(''); // Clear error when user types
                  }}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-[#f5f5f5] text-[#1c1c1c] py-3 px-6 rounded-xl font-semibold hover:bg-[#e5e5e5] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#f5f5f5] disabled:hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-[#1c1c1c]/30 border-t-[#1c1c1c] rounded-full animate-spin"></div>
                    <span>Joining...</span>
                  </div>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>

            <p className="text-[#f5f5f5]/50 text-xs text-center mt-6">
              We'll never spam you. Unsubscribe at any time.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <h2 className="text-2xl font-bold mb-2 text-[#f5f5f5]">You're on the list!</h2>
            <p className="text-[#f5f5f5]/70 mb-4">
              Thanks for joining our waitlist. We'll notify you as soon as we launch!
            </p>
            <div className="text-sm text-[#f5f5f5]/50">
              Keep an eye on your inbox for updates.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;