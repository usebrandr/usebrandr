import React, { useState, useEffect } from 'react';
import { Star, X, Clock, Shield, Zap, Users, TrendingUp } from 'lucide-react';
import WaitlistModal from './WaitlistModal';
import BrandrLogo from './BrandrLogo';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'contact' | 'privacy' | 'terms' | 'cookies') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');
  const [currentReview, setCurrentReview] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const reviews = [
    {
      quote: "AI found the perfect influencers for our brand. Campaigns ready in minutes, not weeks.",
      handle: "@bulletxldn"
    },
    {
      quote: "Finally, brand deals that match my audience. No more spam, just perfect opportunities.",
      handle: "@hardlypc"
    },
    {
      quote: "Paste website, tell AI budget, launch campaign. That's it. Works perfectly.",
      handle: "@hardlyeducated"
    }
  ];

  const goToNext = () => {
    if (currentReview === reviews.length - 1) {
      setCurrentReview(0);
    } else {
      setCurrentReview(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentReview === 0) {
      setCurrentReview(reviews.length - 1);
    } else {
      setCurrentReview(prev => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentReview(index);
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentReview, reviews.length]);

  const handleWaitlistClick = (type: 'business' | 'influencer') => {
    setUserType(type);
    setShowWaitlist(true);
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5]">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-8 py-4 bg-[#1c1c1c]/90 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <BrandrLogo size="md" variant="white" />
        </div>
                            <div className="flex items-center space-x-8">
                      <button onClick={() => onNavigate('about')} className="text-[#f5f5f5] hover:text-white transition-colors font-medium text-lg">About Us</button>
                      <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5] hover:text-white transition-colors font-medium text-lg">FAQs</button>
                    </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c1c1c]/90 via-[#1c1c1c]/85 to-[#1c1c1c]/90 py-24 px-4 sm:px-6 lg:px-8">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
          alt="Team collaboration" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/90 via-[#1c1c1c]/85 to-[#1c1c1c]/90"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#f5f5f5] mb-8 leading-tight">
            Get influencers to talk about your business in minutes.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Paste your website. Chat with our AI. Launch your campaign. That's it.
          </p>
          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex bg-[#1c1c1c]/90 backdrop-blur-sm rounded-2xl p-2 border border-gray-700 shadow-lg">
                <button
                  onClick={() => setUserType('business')}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    userType === 'business'
                      ? 'bg-[#3B82F6] text-white hover:bg-blue-700'
                      : 'text-[#f5f5f5] hover:bg-gray-700 border border-transparent'
                  }`}
                >
                  <span>I'm a Business</span>
                </button>
                <button
                  onClick={() => setUserType('influencer')}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    userType === 'influencer'
                      ? 'bg-[#3B82F6] text-white hover:bg-blue-700'
                      : 'text-[#f5f5f5] hover:bg-gray-700 border border-transparent'
                  }`}
                >
                  <span>I'm a Creator</span>
                </button>
              </div>
              <button
                onClick={() => handleWaitlistClick(userType)}
                className="w-full px-8 py-4 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Use Us */}
      <section id="why-business" className="bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team collaboration" className="absolute left-0 top-0 w-1/3 h-full object-cover opacity-10 rounded-3xl hidden md:block" />
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Office meeting" className="absolute right-0 bottom-0 w-1/3 h-full object-cover opacity-10 rounded-3xl hidden md:block" />
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Analytics dashboard" className="absolute left-1/3 top-1/3 w-1/3 h-1/3 object-cover opacity-10 rounded-3xl hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/80 to-[#1c1c1c]/80"></div>
        <div className="max-w-7xl mx-auto relative z-10">
                                <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Why businesses choose us</h2>
                      </div>
                      <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto items-center justify-center">
                        <div className="flex-1 bg-[#1c1c1c]/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center shadow-lg border border-gray-700">
                          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4 border border-red-500/30">
                            <X className="w-8 h-8 text-red-400" />
                          </div>
                          <h3 className="text-xl font-bold text-[#f5f5f5] mb-4 text-center">No wasted time</h3>
                          <p className="text-gray-300 text-center leading-relaxed">
                            No more messaging influencers who don't reply. Our AI finds the right people and sends your campaign to them automatically.
                          </p>
                        </div>
                        <div className="flex-1 bg-[#1c1c1c]/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center shadow-lg border border-gray-700">
                          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30">
                            <Clock className="w-8 h-8 text-blue-400" />
                          </div>
                          <h3 className="text-xl font-bold text-[#f5f5f5] mb-4 text-center">Ready in minutes</h3>
                          <p className="text-gray-300 text-center leading-relaxed">
                            Tell our AI your budget and who you want to reach. Your campaign is ready to go in minutes, not weeks.
                          </p>
                        </div>
                        <div className="flex-1 bg-[#1c1c1c]/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center shadow-lg border border-gray-700">
                          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 border border-green-500/30">
                            <Shield className="w-8 h-8 text-green-400" />
                          </div>
                          <h3 className="text-xl font-bold text-[#f5f5f5] mb-4 text-center">Perfect matches</h3>
                          <p className="text-gray-300 text-center leading-relaxed">
                            Our AI finds influencers whose followers are exactly the people you want to reach. Better results, more sales.
                          </p>
                        </div>
                      </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gradient-to-br from-[#232323] via-[#1c1c1c] to-[#232323] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Only a subtle fade, no images here */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#232323]/90 via-[#1c1c1c]/95 to-[#232323]/90"></div>
        <div className="max-w-7xl mx-auto relative z-10">
                                <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">How it works</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 mx-auto rounded-full"></div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
                        <div className="flex-1 flex flex-col gap-12 max-w-xl mx-auto">
                          <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-[#3B82F6] text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-lg">1</div>
                            <div>
                              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">Paste your website</h3>
                              <p className="text-lg text-gray-300">Our AI analyzes your brand identity.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-green-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-lg">2</div>
                            <div>
                              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">Tell AI your budget</h3>
                              <p className="text-lg text-gray-300">Set your budget and who you want to reach.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-orange-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl shadow-lg">3</div>
                            <div>
                              <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">Launch your campaign</h3>
                              <p className="text-lg text-gray-300">AI sends it to the right influencers. If they say no, it finds someone else.</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Analytics dashboard" className="w-full max-w-md rounded-2xl shadow-2xl" />
                        </div>
                      </div>
        </div>
      </section>

      {/* Why It Works */}
      <section id="why-it-works" className="bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* 2 images, not 3, to avoid two 3-image sections in a row */}
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team collaboration" className="absolute left-0 top-0 w-1/2 h-full object-cover opacity-10 rounded-3xl hidden md:block" />
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Office meeting" className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-10 rounded-3xl hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/80 to-[#1c1c1c]/80"></div>
        <div className="max-w-7xl mx-auto relative z-10">
                                <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Why it works</h2>
                      </div>
                      <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-[#1c1c1c]/90 backdrop-blur-sm p-12 rounded-3xl border border-gray-700 text-center hover:border-gray-600 transition-all duration-300 flex flex-col items-center gap-8 shadow-lg">
                          <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                            <Zap className="w-10 h-10 text-blue-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#f5f5f5]">AI analyzes your brand identity</h3>
                          <p className="text-xl text-gray-300 leading-relaxed">Our AI looks at your website and analyzes everything about your brand identity to find the perfect influencers.</p>
                        </div>
                        <div className="bg-[#1c1c1c]/90 backdrop-blur-sm p-12 rounded-3xl border border-gray-700 text-center hover:border-gray-600 transition-all duration-300 flex flex-col items-center gap-8 shadow-lg">
                          <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center border border-green-500/30">
                            <Users className="w-10 h-10 text-green-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#f5f5f5]">Sends to right people</h3>
                          <p className="text-xl text-gray-300 leading-relaxed">AI automatically sends your campaign to the best influencers. If they say no, it finds someone else right away.</p>
                        </div>
                        <div className="bg-[#1c1c1c]/90 backdrop-blur-sm p-12 rounded-3xl border border-gray-700 text-center hover:border-gray-600 transition-all duration-300 flex flex-col items-center gap-8 shadow-lg">
                          <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                            <TrendingUp className="w-10 h-10 text-orange-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#f5f5f5]">Better results</h3>
                          <p className="text-xl text-gray-300 leading-relaxed">Perfect matches mean more people see your brand and buy your products.</p>
                        </div>
                      </div>
        </div>
      </section>

      {/* Influencer Testimonials Carousel */}
      <section id="testimonials" className="bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team collaboration" className="absolute left-0 top-0 w-1/3 h-full object-cover opacity-8 rounded-3xl hidden md:block" />
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Office meeting" className="absolute right-0 bottom-0 w-1/3 h-full object-cover opacity-8 rounded-3xl hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/80 to-[#1c1c1c]/80"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">What Our Creators Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out cursor-pointer"
              style={{ 
                transform: `translateX(-${currentReview * 100}%)`
              }}
              onClick={() => goToNext()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#1c1c1c]/90 backdrop-blur-sm p-12 rounded-3xl border border-gray-700 max-w-4xl mx-auto text-center shadow-lg">
                    <div className="flex items-center justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
                    <p className="text-[#f5f5f5] text-xl mb-8 leading-relaxed italic">
                      "{review.quote}"
              </p>
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="font-semibold text-[#f5f5f5] text-lg">{review.handle}</span>
                    </div>
              </div>
            </div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentReview ? 'bg-[#3B82F6]' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add a new vertical flow section after the hero */}
      <section id="business-platform-flow" className="bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Office meeting" className="absolute left-0 top-0 w-1/3 h-full object-cover opacity-15 rounded-3xl hidden md:block" />
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Analytics dashboard" className="absolute right-0 bottom-0 w-1/3 h-full object-cover opacity-15 rounded-3xl hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/80 to-[#1c1c1c]/80"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-12 text-center">How It Works</h2>
          <div className="flex flex-col gap-16 w-full">
            {/* Step 1: AI Brand Analysis */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80" alt="AI Brand Analysis" className="w-full md:w-1/3 h-48 object-cover rounded-2xl shadow-2xl" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">AI analyzes your brand identity</h3>
                <p className="text-lg text-gray-300">Paste your website. Our AI analyzes everything about your brand identity and who you want to reach.</p>
              </div>
            </div>
            {/* Step 2: Conversational Campaign Setup */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 w-full">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" alt="Conversational Setup" className="w-full md:w-1/3 h-48 object-cover rounded-2xl shadow-2xl" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">Tell AI your budget</h3>
                <p className="text-lg text-gray-300">Chat with our AI to set your budget and who you want to reach. Your campaign is ready in minutes.</p>
              </div>
            </div>
            {/* Step 3: Automated Distribution & Re-routing */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Automated Distribution" className="w-full md:w-1/3 h-48 object-cover rounded-2xl shadow-2xl" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">AI sends to right people</h3>
                <p className="text-lg text-gray-300">AI sends your campaign to the best influencers. If they say no, it finds someone else right away.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-24 px-6 lg:px-8 bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 flex flex-col items-start">
              <BrandrLogo size="lg" variant="white" />
              <p className="text-gray-300 mb-6 max-w-md mt-4">
                AI makes influencer marketing easy. No wasted time, no wrong people. Just results.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleWaitlistClick('business')}
                  className="bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  For Businesses
                </button>
                <button
                  onClick={() => handleWaitlistClick('influencer')}
                  className="bg-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  For Creators
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f5f5f5] mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => onNavigate('about')} className="hover:text-[#f5f5f5] transition-colors">About</button></li>
                <li><button onClick={() => onNavigate('faqs')} className="hover:text-[#f5f5f5] transition-colors">FAQs</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-[#f5f5f5] transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f5f5f5] mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-[#f5f5f5] transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('terms')} className="hover:text-[#f5f5f5] transition-colors">Terms of Service</button></li>
                <li><button onClick={() => onNavigate('cookies')} className="hover:text-[#f5f5f5] transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Brandr. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <WaitlistModal 
          onClose={() => setShowWaitlist(false)} 
          userType={userType}
        />
      )}
    </div>
  );
};


export default LandingPage;