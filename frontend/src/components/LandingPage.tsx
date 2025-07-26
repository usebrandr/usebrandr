import React, { useState, useEffect } from 'react';
import WaitlistModal from './WaitlistModal';
import { Briefcase, User, Users, Target, Shield, Zap, ArrowRight, CheckCircle, Building, Lightbulb, ChevronDown, Star, TrendingUp, Clock, DollarSign, Eye, MessageSquare, Play, X } from 'lucide-react';
import SignupModal from './SignupModal';

interface LandingPageProps {
  onShowLogin: () => void;
  onNavigate: (page: 'landing' | 'about' | 'blog' | 'faqs') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin, onNavigate }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistType, setWaitlistType] = useState<'business' | 'influencer'>('business');

  const handleWaitlistClick = (type: 'business' | 'influencer') => {
    setWaitlistType(type);
    setShowWaitlist(true);
  };

  const handleJoinWaitlist = () => {
    setShowWaitlist(true);
  };
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5]">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-8 py-4 bg-[#1c1c1c]/90 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <span className="text-4xl font-extrabold text-[#f5f5f5] tracking-tight">Brandr</span>
        </div>
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">About Us</button>
          <button onClick={() => onNavigate('blog')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">Blog</button>
          <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">FAQs</button>
          <button onClick={onShowLogin} className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/90 via-[#1c1c1c]/85 to-[#1c1c1c]/90" />
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#f5f5f5] mb-8 leading-tight">
            Get real influencers talking about your business with Brandr.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#f5f5f5]/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            We match you with creators who promote your brand — no agencies, no delays, no guesswork.
          </p>
          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <button
                  onClick={() => setWaitlistType('business')}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    waitlistType === 'business'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>I'm a Business</span>
                </button>
                <button
                  onClick={() => setWaitlistType('influencer')}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    waitlistType === 'influencer'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>I'm a Creator</span>
                </button>
              </div>
              <button
                onClick={handleJoinWaitlist}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Use Us */}
      <section id="why-business" className="bg-[#232323] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="No more ghosted DMs" className="absolute left-0 top-0 w-1/3 h-full object-cover opacity-20 rounded-3xl hidden md:block" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Why businesses use us</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto items-center justify-center">
            <div className="flex-1 bg-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center shadow-xl">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">No more ghosted DMs</h3>
            </div>
            <div className="flex-1 bg-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center shadow-xl">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">No long contracts</h3>
            </div>
            <div className="flex-1 bg-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center shadow-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">No fake followers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#1c1c1c] py-24 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col gap-12 max-w-xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-lg">1</div>
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">Tell us what you need</h3>
              <p className="text-lg text-[#f5f5f5]/70">Your goal and budget. That's it.</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-lg">2</div>
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">We match you with real, vetted creators</h3>
              <p className="text-lg text-[#f5f5f5]/70">No bots. No fake followers. Just real people.</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-orange-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-lg">3</div>
            <div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">You approve and track everything</h3>
              <p className="text-lg text-[#f5f5f5]/70">See exactly what's working. No surprises.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="How it works" className="w-full max-w-md h-[400px] object-cover rounded-3xl shadow-2xl" />
        </div>
      </section>

      {/* Why It Works */}
      <section id="why-it-works" className="bg-gradient-to-br from-[#1c1c1c] to-[#232323] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="Why it works" className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-10 rounded-3xl hidden md:block" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Why it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-[#1c1c1c] to-[#333] p-12 rounded-3xl border border-[#f5f5f5]/10 text-center hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center gap-8 shadow-xl">
              <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5]">Fast, done-for-you setup</h3>
              <p className="text-xl text-[#f5f5f5]/70 leading-relaxed">We handle the matching. You focus on your business.</p>
            </div>
            <div className="bg-gradient-to-br from-[#1c1c1c] to-[#333] p-12 rounded-3xl border border-[#f5f5f5]/10 text-center hover:border-green-500/30 transition-all duration-300 flex flex-col items-center gap-8 shadow-xl">
              <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <Users className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5]">Only serious creators</h3>
              <p className="text-xl text-[#f5f5f5]/70 leading-relaxed">Every creator is vetted. No time wasters.</p>
            </div>
            <div className="bg-gradient-to-br from-[#1c1c1c] to-[#333] p-12 rounded-3xl border border-[#f5f5f5]/10 text-center hover:border-orange-500/30 transition-all duration-300 flex flex-col items-center gap-8 shadow-xl">
              <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5]">Built to grow your business</h3>
              <p className="text-xl text-[#f5f5f5]/70 leading-relaxed">Real results. Real growth. No fluff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-[#181818] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">What founders say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-[#232323] to-[#333] p-10 rounded-3xl border border-[#f5f5f5]/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center gap-6 shadow-xl">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Jessica Smith" className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 mb-4" />
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#f5f5f5]/90 text-lg mb-4 leading-relaxed text-center">
                "This replaced our agency overnight. We're getting better creators, faster turnaround, and actual ROI tracking."
              </p>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-[#f5f5f5]">Jessica Smith</span>
                <span className="text-[#f5f5f5]/70 text-sm">CMO, TechFlow</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#232323] to-[#333] p-10 rounded-3xl border border-[#f5f5f5]/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center gap-6 shadow-xl">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Marcus Rodriguez" className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 mb-4" />
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#f5f5f5]/90 text-lg mb-4 leading-relaxed text-center">
                "Finally, a platform that gets it. No fluff, no fake metrics. Just real partnerships that move the needle."
              </p>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-[#f5f5f5]">Marcus Rodriguez</span>
                <span className="text-[#f5f5f5]/70 text-sm">Founder, GrowthLab</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#232323] to-[#333] p-10 rounded-3xl border border-[#f5f5f5]/10 hover:border-green-500/30 transition-all duration-300 flex flex-col items-center gap-6 shadow-xl">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Alex Kim" className="w-20 h-20 rounded-full object-cover border-4 border-green-500 mb-4" />
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#f5f5f5]/90 text-lg mb-4 leading-relaxed text-center">
                "We 3x'd our conversion rate in the first month. The quality of creators here is unmatched."
              </p>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-[#f5f5f5]">Alex Kim</span>
                <span className="text-[#f5f5f5]/70 text-sm">VP Marketing, StyleCo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add a new vertical flow section after the hero */}
      <section id="business-platform-flow" className="bg-[#181818] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-12 text-center">How Brandr Works for Your Business</h2>
          <div className="flex flex-col gap-16 w-full">
            {/* Step 1: Business submits campaign */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="Submit Campaign" className="w-full md:w-1/3 h-48 object-cover rounded-2xl shadow-xl" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">You describe your campaign</h3>
                <p className="text-lg text-[#f5f5f5]/80">Tell us your goals, product, audience, budget, and upload any creative briefs or content. Our AI strategist guides you every step of the way.</p>
              </div>
            </div>
            {/* Step 2: Platform matches & vets creators */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 w-full">
              <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" alt="Matching Creators" className="w-full md:w-1/3 h-48 object-cover rounded-2xl shadow-xl" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">We match you with the best creators</h3>
                <p className="text-lg text-[#f5f5f5]/80">Our platform uses AI and human vetting to find creators who fit your campaign’s goals, audience, and content style. No fake followers, no wasted budget.</p>
              </div>
            </div>
            {/* Step 3: Campaign launches & tracks results */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Campaign Results" className="w-full md:w-1/3 h-48 object-cover rounded-2xl shadow-xl" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">You approve, launch, and track everything</h3>
                <p className="text-lg text-[#f5f5f5]/80">Approve creators, review content, and track real-time results in your dashboard. We handle payments, reporting, and support—so you can focus on growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-[#f5f5f5]/10 py-24 px-6 lg:px-8 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <span className="text-4xl font-extrabold text-[#f5f5f5] tracking-tight">Brandr</span>
          </div>
          <div className="flex space-x-12">
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Terms</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Privacy</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Contact</button>
          </div>
        </div>
      </footer>

      {showWaitlist && (
        <WaitlistModal 
          onClose={() => setShowWaitlist(false)} 
          userType={waitlistType}
        />
      )}
    </div>
  );
};


export default LandingPage;