import React, { useState, useEffect } from 'react';
import WaitlistModal from './WaitlistModal';
import { Briefcase, User, Users, Target, Shield, Zap, ArrowRight, CheckCircle, Building, Lightbulb, ChevronDown, Star, TrendingUp, Clock, DollarSign, Eye, MessageSquare, Play, Pause, X, Search, BarChart3, Rocket, Sparkles, Globe, Award, Heart, Target as TargetIcon, Zap as ZapIcon, Users as UsersIcon, ArrowLeft, ArrowRight as ArrowRightIcon } from 'lucide-react';

import BrandrLogo from './BrandrLogo';
import MondayBackground from './MondayBackground';
import MouseGlow from './MouseGlow';
import OrganicArcs from './OrganicArcs';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistType, setWaitlistType] = useState<'business' | 'influencer'>('business');
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWaitlistClick = (type: 'business' | 'influencer') => {
    setWaitlistType(type);
    setShowWaitlist(true);
  };

  const handleJoinWaitlist = () => {
    console.log('Join Waitlist clicked, current type:', waitlistType);
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

  const features = [
    {
      title: "Brand Identity Engine",
      description: "Our AI analyzes your website, social media, and content to extract your brand's unique tone, audience, values, and visual energy.",
      icon: Sparkles,
      color: "blue",
      image: "/analysing.png"
    },
    {
      title: "Smart Creator Matching",
      description: "Find creators who match your brand's style, not just demographics. No more bad-fit partnerships.",
      icon: UsersIcon,
      color: "green",
      image: "/smart-match.png"
    },
    {
      title: "Instant Campaign Launch",
      description: "Launch campaigns in minutes, not weeks. No agencies, no DMs, no spreadsheets — just results.",
      icon: Rocket,
      color: "purple",
      image: "/start-campaign.png"
    },
    {
      title: "Performance Dashboard",
      description: "Track real-time results, ROI, and campaign performance. See exactly what's working and what's not.",
      icon: BarChart3,
      color: "orange",
      image: "/live-metrics.png"
    }
  ];

  const flowSteps = [
    {
      title: "Connect Your Brand",
      description: "Paste your website URL and our AI instantly analyzes your brand identity, tone, and target audience.",
      image: "/placeholder-step1.jpg" // You'll provide this image
    },
    {
      title: "Review Matches",
      description: "Browse creators who match your brand's style and values. Each creator is pre-vetted and ready to collaborate.",
      image: "/placeholder-step2.jpg" // You'll provide this image
    },
    {
      title: "Launch Campaign",
      description: "Approve creators, set budgets, and launch campaigns instantly. Track everything in real-time.",
      image: "/placeholder-step3.jpg" // You'll provide this image
    },
    {
      title: "Track Results",
      description: "Monitor performance, engagement, and ROI in your dashboard. Optimize campaigns based on real data.",
      image: "/placeholder-step4.jpg" // You'll provide this image
    }
  ];

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const nextFlowStep = () => {
    setActiveFlowStep((prev) => (prev + 1) % flowSteps.length);
  };

  const prevFlowStep = () => {
    setActiveFlowStep((prev) => (prev - 1 + flowSteps.length) % flowSteps.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mouse Glow Effect */}
      <MouseGlow />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-black/80 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <BrandrLogo 
            size="lg" 
            onClick={() => {
              onNavigate('landing');
              window.scrollTo(0, 0);
            }}
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-base lg:text-lg px-3 py-2 rounded-lg hover:bg-white/10">About Us</button>
          <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium text-base lg:text-lg px-3 py-2 rounded-lg hover:bg-white/10">FAQs</button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/20 md:hidden">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-white/80 hover:text-white transition-colors font-medium text-lg py-3 px-4 rounded-lg hover:bg-white/10"
              >
                About Us
              </button>
              <button 
                onClick={() => {
                  onNavigate('faqs');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-white/80 hover:text-white transition-colors font-medium text-lg py-3 px-4 rounded-lg hover:bg-white/10"
              >
                FAQs
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Mobile First Layout */}
      <section id="hero" className="relative min-h-screen overflow-hidden bg-black -mt-20">
        {/* Monday.com Style Background */}
        <MondayBackground />
        
        {/* Organic Arcs Background */}
        <OrganicArcs />
        
        {/* Hero Content - Stacked Layout for Mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 lg:px-16 relative z-10 pt-24 sm:pt-20">
          {/* Hero Content - Top Section (Mobile) / Left Side (Desktop) */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 relative z-10 mb-6 sm:mb-8 lg:mb-0">
            <div className="max-w-2xl text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
                The AI to power <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">your business's</span> organic marketing.
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-2 sm:px-0">
                AI-powered creator matchmaking that delivers real results.
              </p>
              <div className="max-w-md mx-auto px-2 sm:px-0">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 gap-2">
                    <button
                      onClick={() => setWaitlistType('business')}
                      className={`flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 min-h-[48px] ${
                        waitlistType === 'business'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:hidden">Business</span>
                      <span className="hidden md:inline">I'm a Business</span>
                    </button>
                    <button
                      onClick={() => setWaitlistType('influencer')}
                      className={`flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 min-h-[48px] ${
                        waitlistType === 'influencer'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:hidden">Creator</span>
                      <span className="hidden md:inline">I'm a Creator</span>
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleJoinWaitlist}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg transform hover:scale-105 min-h-[48px]"
                    >
                      Join the Waitlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Demo - Bottom Section (Mobile) / Right Side (Desktop) */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 relative z-10 w-full">
            <div className="relative w-full max-w-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 text-center">Product Demo</h3>
              <div className="relative group border-2 border-white/20 rounded-2xl sm:rounded-3xl p-1 sm:p-2">
                <video 
                  className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl"
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
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-xl sm:rounded-2xl group-hover:opacity-100 opacity-0"
                onClick={(e) => {
                  const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" id="play-pause-icon" />
                </div>
              </button>
              
              {/* Fullscreen Button */}
              <button 
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
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
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Progress Bar */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-100"
                    style={{ width: '0%' }}
                    id="progress-bar"
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1.5 sm:mt-2 text-white text-xs sm:text-sm">
                  <span id="current-time">0:00</span>
                  <span id="total-time">0:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Problem Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  The problem with influencer marketing
                </h2>
                <p className="text-xl text-white/80 leading-relaxed">
                  Generic databases don't work. Creator fees are rising, brands are guessing, and ROI is inconsistent.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Bad-fit partnerships</h3>
                    <p className="text-white/70">Creators who don't match your brand's tone, audience, or values</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Wasted budget</h3>
                    <p className="text-white/70">High fees for creators who don't deliver measurable results</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Manual processes</h3>
                    <p className="text-white/70">Endless DMs, spreadsheets, and agency back-and-forth</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Solution Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Brandr's solution
                </h2>
                <p className="text-xl text-white/80 leading-relaxed">
                  We analyze your brand identity and match you with creators who actually fit your style, tone, and vibe.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Brand Identity AI</h3>
                    <p className="text-white/70">Analyzes your website and social media to extract tone, audience, and values</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Niche-aligned matching</h3>
                    <p className="text-white/70">Finds creators who match your brand's style, not just demographics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Instant campaigns</h3>
                    <p className="text-white/70">Launch, track, and manage everything in one place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore our features</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Scroll through our powerful features and see how Brandr transforms influencer marketing
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Large Feature Image */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src={features[activeFeature].image} 
                  alt={features[activeFeature].title}
                  className="w-full h-full object-contain bg-black/20"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevFeature}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextFeature}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  <ArrowRightIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            
            {/* Feature Navigation Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                    index === activeFeature
                      ? 'bg-blue-600/20 border-blue-500/50 text-white'
                      : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index === activeFeature ? 'bg-blue-500/20' : 'bg-white/10'
                    }`}>
                      {React.createElement(feature.icon, { 
                        className: `w-4 h-4 ${index === activeFeature ? 'text-blue-400' : 'text-white/60'}` 
                      })}
                    </div>
                    <span className="text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm leading-relaxed opacity-80">{feature.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* How It Works Section */}
      <section className="py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How it works</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Three simple steps to launch campaigns that actually convert
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Paste your site</h3>
              <p className="text-white/70 leading-relaxed">
                Our AI analyzes your website and social media to understand your brand identity, tone, and target audience.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Get aligned creators</h3>
              <p className="text-white/70 leading-relaxed">
                We match you with creators who share your brand's style, values, and audience — not just demographics.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Launch instantly</h3>
              <p className="text-white/70 leading-relaxed">
                Approve creators, review content, and track performance live — all from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to find creators who actually match your brand?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join the waitlist and be among the first to experience AI-powered creator matchmaking that delivers real results.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setWaitlistType('business')}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  waitlistType === 'business'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
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
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <User className="w-5 h-5" />
                <span>I'm a Creator</span>
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowWaitlist(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
          
          <p className="text-white/60 mt-6 text-sm">
            Free to join • No commitment • Early access to new features
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-24 px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <BrandrLogo 
              size="lg" 
              onClick={() => {
                onNavigate('landing');
                window.scrollTo(0, 0);
              }}
            />
          </div>
          <div className="flex space-x-12">
            <button onClick={() => onNavigate('terms')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Terms</button>
            <button onClick={() => onNavigate('privacy')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Privacy</button>
            <button onClick={() => onNavigate('contact')} className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors text-lg">Contact</button>
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