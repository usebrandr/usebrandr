import React, { useEffect } from 'react';
import { Mail, MapPin, ArrowLeft } from 'lucide-react';
import BrandrLogo from './BrandrLogo';
import MouseGlow from './MouseGlow';

interface ContactPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">About</button>
          <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">FAQs</button>
        </div>
      </nav>

      {/* Contact Section */}
      <div className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8">Get in Touch</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-12"></div>
          
          <p className="text-xl text-white/90 mb-16 max-w-2xl mx-auto">
            Have questions about Brandr? We'd love to hear from you. Reach out to us and we'll get back to you as soon as possible.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Email Contact */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Email Us</h3>
              <p className="text-white/70 mb-4">Send us an email anytime</p>
              <a 
                href="mailto:info@usebrandr.com" 
                className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-semibold"
              >
                info@usebrandr.com
              </a>
            </div>
            
            {/* Location */}
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center shadow-xl">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
              <p className="text-white/70 mb-4">Based in the heart of</p>
              <p className="text-purple-400 font-semibold text-lg">London, United Kingdom</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">What to Expect</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Response Time</h4>
                <p className="text-white/70">We typically respond within 24 hours during business days.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Business Hours</h4>
                <p className="text-white/70">Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Support</h4>
                <p className="text-white/70">We're here to help with any questions about our platform.</p>
              </div>
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

export default ContactPage;
