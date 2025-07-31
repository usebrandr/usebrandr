import React from 'react';
import BrandrLogo from './BrandrLogo';
import { ArrowLeft } from 'lucide-react';

type AppState = 'landing' | 'about' | 'faqs' | 'privacy' | 'terms' | 'cookies';

interface AboutPageProps {
  onNavigate: (page: AppState) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5]">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-4 lg:px-8 bg-[#1c1c1c]/90 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <BrandrLogo size="md" variant="white" />
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-[#f5f5f5] hover:text-white transition-colors font-medium flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => onNavigate('faqs')}
            className="text-[#f5f5f5] hover:text-white transition-colors font-medium"
          >
            FAQs
          </button>
        </div>
      </nav>

      {/* About Us Section */}
      <div className="py-24 px-6 bg-[#232323] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232323]/90 to-[#1c1c1c]/90"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#f5f5f5] mb-8">About Us</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 mx-auto rounded-full mb-12"></div>
          <div className="space-y-8 text-xl leading-relaxed">
            <p className="text-gray-300">
              We make influencer marketing simple. No more guessing, no more wasted time.
            </p>
            <p className="text-gray-300">
              Our AI analyzes your brand identity and finds the perfect influencers. That's it.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 px-6 bg-[#1c1c1c] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232323]/80 to-[#1c1c1c]/80"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#f5f5f5] mb-6">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#232323]/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">AI finds perfect matches</h3>
              <p className="text-gray-300 leading-relaxed">
                Our AI analyzes your brand identity and finds influencers whose followers are exactly who you want to reach.
              </p>
            </div>
            <div className="bg-[#232323]/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">Ready in minutes</h3>
              <p className="text-gray-300 leading-relaxed">
                Campaigns launch in minutes, not weeks. If someone says no, AI finds someone else right away.
              </p>
            </div>
            <div className="bg-[#232323]/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">Better results</h3>
              <p className="text-gray-300 leading-relaxed">
                Perfect matches mean more people see your brand and buy your products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-20 px-10 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <BrandrLogo size="md" variant="white" />
          </div>
          <div className="flex space-x-8">
            <button onClick={() => onNavigate('terms')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors">Terms</button>
            <button onClick={() => onNavigate('privacy')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors">Privacy</button>
            <button onClick={() => onNavigate('cookies')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors">Cookies</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;