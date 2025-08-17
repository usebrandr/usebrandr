import React, { useEffect } from 'react';
import { Zap, ArrowLeft } from 'lucide-react';
import BrandrLogo from './BrandrLogo';
import MouseGlow from './MouseGlow';

interface AboutPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mouse Glow Effect */}
      <MouseGlow />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-transparent backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <BrandrLogo size="lg" />
        </div>
        
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('landing')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">Back to Home</button>
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
              We're a team of engineers, designers, and marketers who believe that authentic partnerships drive real growth. We've seen too many brands waste money on creators who don't align with their values, and too many creators stuck with campaigns that don't resonate with their audience.
            </p>
            <p className="text-white/90">
              Our approach is Brand Identity Analysis: we analyze a brand's website or social presence to extract its tone, values, aesthetic, and audience positioning. This allows us to match each business with the exact creators who naturally align — visually, tonally, and culturally.
            </p>
            <p className="text-white/90">
              In the future, Brandr becomes the infrastructure layer for influencer marketing. Every campaign launched through our platform teaches the system more about what works, what resonates, and which creators drive outcomes for which brands.
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
              <h3 className="text-2xl font-bold text-white mb-4">Brand Identity</h3>
              <p className="text-white/70 leading-relaxed">
                Every brand gets a dynamic "Brand Identity" profile that evolves with each campaign, becoming increasingly precise.
              </p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Matching</h3>
              <p className="text-white/70 leading-relaxed">
                Our system becomes the go-to AI layer for matching brands and creators, with smarter recommendations over time.
              </p>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Infrastructure Layer</h3>
              <p className="text-white/70 leading-relaxed">
                We automate targeting, pricing, content guidance, and attribution — becoming the essential infrastructure for organic growth.
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
            <button onClick={() => onNavigate('terms')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Terms</button>
            <button onClick={() => onNavigate('privacy')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Privacy</button>
            <button onClick={() => onNavigate('contact')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;