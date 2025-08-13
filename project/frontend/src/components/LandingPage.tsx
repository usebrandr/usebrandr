import React from 'react';

interface LandingPageProps {
  onJoinWaitlist: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoinWaitlist }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            UseBrandr
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect top creators with leading brands. The future of influencer marketing is here.
          </p>
        </div>
        
        <div className="space-y-6">
          <button
            onClick={onJoinWaitlist}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Join the Waitlist
          </button>
          
          <div className="text-gray-400 text-sm">
            Be the first to know when we launch
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Early Access</h3>
            <p className="text-gray-400">Get exclusive access to our platform before anyone else</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold text-white mb-2">Premium Features</h3>
            <p className="text-gray-400">Access to advanced tools and premium partnerships</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
            <p className="text-gray-400">AI-powered creator-brand matching for optimal results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;