import React, { useState } from 'react';
import { X, Mail, CheckCircle, Briefcase, User } from 'lucide-react';

interface WaitlistModalProps {
  onClose: () => void;
  userType: 'business' | 'influencer';
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ onClose, userType }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const isInfluencer = userType === 'influencer';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#f5f5f5]/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f5f5f5]/10 transition-colors"
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
              Join the {isInfluencer ? 'Influencer' : 'Business'} Waitlist
            </h2>
            <p className="text-[#f5f5f5]/70 text-center mb-8">
              {isInfluencer 
                ? 'Be the first to know when we launch for creators. Get early access to brand partnerships.'
                : 'Be the first to know when we launch. Get early access to connect with top creators.'
              }
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#f5f5f5] text-[#1c1c1c] py-3 px-6 rounded-xl font-semibold hover:bg-[#e5e5e5] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Join Waitlist
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-[#f5f5f5]">You're on the list!</h2>
            <p className="text-[#f5f5f5]/70">
              We'll notify you as soon as we launch. Thanks for your interest!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;