import React, { useState } from 'react';
import { Zap, ArrowLeft, ChevronDown } from 'lucide-react';
import BrandrLogo from './BrandrLogo';

interface FAQsPageProps {
  onNavigate: (page: 'landing' | 'about' | 'blog' | 'faqs') => void;
}

const FAQsPage: React.FC<FAQsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-transparent backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <BrandrLogo size="lg" />
        </div>
        
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('landing')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">Back to Home</button>
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">About Us</button>
          <button onClick={() => onNavigate('blog')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">Blog</button>
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
              question="How do I get matched to campaigns?"
              answer="Our AI-powered matching system analyzes your profile, content style, audience demographics, and engagement rates to connect you with relevant campaigns. Brands can also discover and invite you directly based on your portfolio."
            />
            <FAQItem 
              question="What social platforms do you support?"
              answer="We currently support Instagram, TikTok, and YouTube. We're constantly expanding to include more platforms based on creator and brand demand. You can connect multiple platforms to increase your visibility."
            />
            <FAQItem 
              question="Is it free to use?"
              answer="Yes! InfluenceConnect is completely free for creators. We only charge brands a small platform fee when campaigns are successfully completed. Creators keep 100% of their negotiated rates."
            />
            <FAQItem 
              question="How do businesses pay creators?"
              answer="Payments are processed securely through our platform. Once your content is approved and published, payment is automatically released to your connected bank account or PayPal within 3-5 business days."
            />
            <FAQItem 
              question="Can I decline a campaign if I'm matched?"
              answer="Absolutely! You have full control over which campaigns you accept. We encourage you to only work with brands that align with your values and audience. There's no penalty for declining campaigns."
            />
            <FAQItem 
              question="How long does it take to get matched with campaigns?"
              answer="Most creators start receiving campaign invitations within 24-48 hours of completing their profile. The more complete and engaging your profile, the faster you'll get matched with relevant opportunities."
            />
            <FAQItem 
              question="What happens if a brand doesn't approve my content?"
              answer="We work with you and the brand to understand any feedback and make necessary revisions. If content is rejected due to brand requirements not being met, we'll help facilitate a solution. Payment is only released once both parties are satisfied."
            />
            <FAQItem 
              question="Can I work with multiple brands at the same time?"
              answer="Yes! You can accept and work on multiple campaigns simultaneously, as long as there are no conflicts of interest (competing brands in the same industry). We'll help you manage your campaign schedule effectively."
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
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Terms</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Privacy</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Contact</button>
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