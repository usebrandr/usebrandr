import React, { useState } from 'react';
import { Zap, ArrowLeft, ChevronDown } from 'lucide-react';
import BrandrLogo from './BrandrLogo';
import MouseGlow from './MouseGlow';

interface FAQsPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => void;
}

const FAQsPage: React.FC<FAQsPageProps> = ({ onNavigate }) => {
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
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">About Us</button>
        </div>
      </nav>

      {/* FAQs Section */}
      <div className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-white/80 leading-relaxed">
              Everything you need to know about getting started with Brandr.
            </p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="How does Brand Identity Analysis work?"
              answer="Our AI analyzes your website, social media presence, and content to extract your brand's unique tone, values, aesthetic, and audience positioning. This creates a comprehensive brand profile that we use to match you with creators who naturally align with your brand identity."
            />
            <FAQItem 
              question="What makes Brandr different from other influencer platforms?"
              answer="Unlike generic databases, we focus on authentic alignment. Our AI doesn't just match demographics — it analyzes brand identity to find creators who share your visual style, tone, and cultural values. This results in more authentic partnerships and better campaign performance."
            />
            <FAQItem 
              question="How do you ensure creator quality and authenticity?"
              answer="We vet all creators through our platform and analyze their content style, audience engagement, and brand alignment. We also monitor campaign performance to continuously improve our matching algorithms and ensure only high-quality creators are recommended."
            />
            <FAQItem 
              question="What social platforms do you support?"
              answer="We currently support Instagram, TikTok, and YouTube. Our platform is designed to work with any social platform where creators build authentic audiences. We're constantly expanding based on brand and creator demand."
            />
            <FAQItem 
              question="How long does it take to get matched with creators?"
              answer="Once you connect your brand, our AI typically finds relevant creators within 24-48 hours. The more complete your brand profile, the faster and more accurate the matches will be."
            />
            <FAQItem 
              question="Can I review and approve content before it goes live?"
              answer="Yes! You have full control over content approval. Our platform includes built-in review workflows where you can provide feedback and request revisions before content is published. This ensures your brand standards are maintained."
            />
            <FAQItem 
              question="How do payments and contracts work?"
              answer="We handle all payment processing and contract management through our platform. Payments are released automatically once content is approved and published. We provide transparent pricing with no hidden fees."
            />
            <FAQItem 
              question="What if a creator doesn't deliver as expected?"
              answer="We work closely with both parties to ensure successful campaigns. If issues arise, our team helps facilitate solutions and can provide alternative creators if needed. Your satisfaction and campaign success are our top priorities."
            />
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

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300 shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="text-xl font-semibold text-white">{question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-white/70 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <p className="text-white/80 leading-relaxed text-lg">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQsPage;