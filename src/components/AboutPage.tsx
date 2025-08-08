import React from 'react';
import { Zap, ArrowLeft } from 'lucide-react';
import BrandrLogo from './BrandrLogo';

interface AboutPageProps {
  onNavigate: (page: 'landing' | 'about' | 'blog' | 'faqs') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-transparent backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <BrandrLogo size="lg" />
        </div>
        
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('landing')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">Back to Home</button>
          <button onClick={() => onNavigate('blog')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">Blog</button>
          <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">FAQs</button>
        </div>
      </nav>

      {/* About Us Section */}
      <div className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8">About Us</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-12"></div>
          <div className="space-y-8 text-xl leading-relaxed">
            <p className="text-white/90">
              We believe organic marketing beats paid ads. Brandr exists to help founders grow by partnering with creators who actually care. No middlemen, no fake metrics — just real partnerships that drive real growth.
            </p>
            <p className="text-white/90">
              We're building a future where every startup can connect directly with the right influencer, and every creator gets access to meaningful campaigns — not spammy promo.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Authentic Connections</h3>
              <p className="text-white/70 leading-relaxed">
                We connect brands with creators who genuinely align with their values and audience, ensuring authentic partnerships.
              </p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Transparent Process</h3>
              <p className="text-white/70 leading-relaxed">
                No hidden fees, no fake metrics. We provide clear, honest data and straightforward pricing for all parties.
              </p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mutual Growth</h3>
              <p className="text-white/70 leading-relaxed">
                We believe in win-win partnerships where both brands and creators achieve their goals and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <BrandrLogo size="lg" />
          </div>
          <div className="flex space-x-12">
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Terms</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Privacy</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;