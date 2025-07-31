import React, { useState } from 'react';
import BrandrLogo from './BrandrLogo';
import { ArrowLeft, ChevronDown } from 'lucide-react';

type AppState = 'landing' | 'about' | 'faqs' | 'privacy' | 'terms' | 'cookies';

interface FAQsPageProps {
  onNavigate: (page: AppState) => void;
}

const FAQsPage: React.FC<FAQsPageProps> = ({ onNavigate }) => {
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
            onClick={() => onNavigate('about')}
            className="text-[#f5f5f5] hover:text-white transition-colors font-medium"
          >
            About Us
          </button>
        </div>
      </nav>

      {/* FAQs Section */}
      <div className="py-24 px-6 bg-[#232323] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232323]/90 to-[#1c1c1c]/90"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#f5f5f5] mb-6">Frequently Asked Questions</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Simple answers to common questions.
            </p>
          </div>
          <div className="space-y-4">
            {/* FAQ Items remain unchanged */}
            <FAQItem 
              question="How does AI analyze my brand?"
              answer="Paste your website. Our AI looks at it and analyzes everything about your brand identity to find the right influencers."
            />
            <FAQItem 
              question="How fast can I launch a campaign?"
              answer="Minutes, not weeks. Tell AI your budget and who you want to reach. Your campaign is ready to go."
            />
            <FAQItem 
              question="What if an influencer says no?"
              answer="AI finds someone else right away. No waiting, no delays."
            />
            <FAQItem 
              question="How do you find the right influencers?"
              answer="AI looks at your brand and finds influencers whose followers are exactly who you want to reach."
            />
            <FAQItem 
              question="Which social platforms work?"
              answer="Instagram and TikTok only."
            />
            <FAQItem 
              question="Is it free for creators?"
              answer="Yes! Free for creators. We charge a fee on each deal."
            />
            <FAQItem 
              question="How do payments work?"
              answer="You get paid when the campaign is finished and your content is approved."
            />
            <FAQItem 
              question="Can creators say no?"
              answer="Yes! If a campaign doesn't fit your audience, just say no. AI finds someone else."
            />
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

// FAQ Item Component remains unchanged
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#232323] to-[#333] rounded-2xl border border-[#f5f5f5]/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#444]/30 transition-colors"
      >
        <span className="text-xl font-semibold text-[#f5f5f5]">{question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-[#f5f5f5]/70 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <p className="text-[#f5f5f5]/80 leading-relaxed text-lg">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQsPage;