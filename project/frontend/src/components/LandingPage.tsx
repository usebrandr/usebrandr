import React, { useState, useEffect } from 'react';
import WaitlistModal from './WaitlistModal';
import { Briefcase, User, Users, Target, Shield, Zap, ArrowRight, CheckCircle, Building, Lightbulb, ChevronDown, Star, TrendingUp, Clock, DollarSign, Eye, MessageSquare, Play, Pause, X } from 'lucide-react';

import BrandrLogo from './common/BrandrLogo';
import MetricsMatrix from './MetricsMatrix';
import MouseGlow from './MouseGlow';

interface LandingPageProps {
  onShowLogin: () => void;
  onNavigate: (page: 'landing' | 'about' | 'faqs') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin: _onShowLogin, onNavigate }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistType, setWaitlistType] = useState<'business' | 'influencer'>('business');

  const handleWaitlistClick = (type: 'business' | 'influencer') => {
    setWaitlistType(type);
    setShowWaitlist(true);
  };

  const handleJoinWaitlist = () => {
    setShowWaitlist(true);
  };

  // Video progress functionality
  useEffect(() => {
    const video = document.querySelector('video');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const totalTimeSpan = document.getElementById('total-time');
    const playPauseIcon = document.getElementById('play-pause-icon');

    if (video && progressBar && currentTimeSpan && totalTimeSpan) {
      const updateProgress = () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeSpan.textContent = formatTime(video.currentTime);
      };

      const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };

      const updatePlayPauseIcon = () => {
        if (playPauseIcon) {
          if (video.paused) {
            playPauseIcon.innerHTML = '<path d="M8 5v10l8-5z" fill="currentColor"/>';
          } else {
            playPauseIcon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>';
          }
        }
      };

      video.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(video.duration);
      });

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('play', () => {
        updateProgress();
        updatePlayPauseIcon();
      });
      video.addEventListener('pause', () => {
        updateProgress();
        updatePlayPauseIcon();
      });

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('play', updateProgress);
        video.removeEventListener('pause', updateProgress);
      };
    }
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
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">About Us</button>
          <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-lg">FAQs</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden bg-black -mt-20">
        {/* Metrics Matrix Background */}
        <MetricsMatrix />

        {/* Hero corner SVG decorations */}
        <img
          src="/TopLeftSVG.svg"
          alt="Top-left decorative"
          className="pointer-events-none select-none absolute -top-10 -left-10 w-[520px] opacity-70 animate-pulse z-0"
          style={{ animationDuration: '5s' }}
        />
        <img
          src="/Bottom Right.svg"
          alt="Top-right decorative"
          className="pointer-events-none select-none absolute -top-10 -right-10 w-[520px] opacity-70 animate-pulse z-0"
          style={{ animationDuration: '5s' }}
        />
        
        {/* Hero Content - Top on mobile, Left on desktop */}
        <div className="w-full lg:flex-1 flex items-center justify-center px-8 lg:px-16 relative z-10 py-12 lg:py-0">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              The AI to optimise <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">your business's</span> organic marketing.
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 lg:mb-12 leading-relaxed">
              AI-powered creator matchmaking that delivers real results.
            </p>
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                  <button
                    onClick={() => setWaitlistType('business')}
                    className={`flex-1 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base ${
                      waitlistType === 'business'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                    <span>I'm a Business</span>
                  </button>
                  <button
                    onClick={() => setWaitlistType('influencer')}
                    className={`flex-1 px-4 md:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base ${
                      waitlistType === 'influencer'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <User className="w-4 h-4 md:w-5 md:h-5" />
                    <span>I'm a Creator</span>
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleJoinWaitlist}
                    className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg transform hover:scale-105"
                  >
                    Join the Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Demo - Bottom on mobile, Right on desktop */}
        <div className="w-full lg:flex-1 flex items-center justify-center px-8 lg:px-16 relative z-10 pb-12 lg:pb-0">
          <div className="relative w-full max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">Product Demo</h3>
            <div className="relative group border-2 border-white/20 rounded-3xl p-2">
              <video 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                poster="/video-thumbnail.jpg"
                onClick={(e) => {
                  const video = e.currentTarget as HTMLVideoElement;
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }}
              >
                <source src="/Product Demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause Button */}
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-2xl group-hover:opacity-100 opacity-0"
                onClick={(e) => {
                  const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" id="play-pause-icon" />
                </div>
              </button>
              
              {/* Fullscreen Button */}
              <button 
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
                onClick={(e) => {
                  const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
                  if (video) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      video.requestFullscreen();
                    }
                  }
                }}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Progress Bar */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                    style={{ width: '0%' }}
                    id="progress-bar"
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-white text-xs md:text-sm">
                  <span id="current-time">0:00</span>
                  <span id="total-time">0:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Use Us */}
      <section id="why-business" className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="No more ghosted DMs" className="absolute left-0 top-0 w-1/3 h-full object-cover opacity-20 rounded-3xl hidden md:block" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Why businesses use us</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto items-center justify-center">
            <div className="flex-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-xl">
              <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No more ghosted DMs</h3>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-xl">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No long contracts</h3>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-xl">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No fake followers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-black py-24 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
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
          <div className="w-full max-w-2xl">
                         <h3 className="text-xl md:text-2xl font-bold text-[#f5f5f5] mb-4 md:mb-6 text-center">Product Demo</h3>
                          <video 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                controls
                poster="/video-thumbnail.jpg"
              >
              <source src="/Product Demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section id="why-it-works" className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="Why it works" className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-10 rounded-3xl hidden md:block" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Why it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-black/40 backdrop-blur-sm p-12 rounded-3xl border border-white/10 text-center hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center gap-8 shadow-xl">
              <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5]">Fast, done-for-you setup</h3>
              <p className="text-xl text-[#f5f5f5]/70 leading-relaxed">We handle the matching. You focus on your business.</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-12 rounded-3xl border border-white/10 text-center hover:border-green-500/30 transition-all duration-300 flex flex-col items-center gap-8 shadow-xl">
              <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <Users className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5]">Only serious creators</h3>
              <p className="text-xl text-[#f5f5f5]/70 leading-relaxed">Every creator is vetted. No time wasters.</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-12 rounded-3xl border border-white/10 text-center hover:border-orange-500/30 transition-all duration-300 flex flex-col items-center gap-8 shadow-xl">
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
      <section id="testimonials" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">What founders say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-black/40 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center gap-6 shadow-xl">
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
            <div className="bg-black/40 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center gap-6 shadow-xl">
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
            <div className="bg-black/40 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-green-500/30 transition-all duration-300 flex flex-col items-center gap-6 shadow-xl">
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
      <section id="business-platform-flow" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
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