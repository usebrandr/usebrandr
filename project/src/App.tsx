import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import OnboardingFlow from './components/OnboardingFlow';
import Dashboard from './components/Dashboard';
import InfluencerDashboard from './components/InfluencerDashboard';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import FAQsPage from './components/FAQsPage';

export type AppState = 'landing' | 'onboarding' | 'dashboard' | 'about' | 'blog' | 'faqs';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogin = (loginUserType: 'business' | 'influencer') => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    setUserType(loginUserType);
    setCurrentView('dashboard');
  };

  const handleSignup = (signupUserType: 'business' | 'influencer') => {
    setShowLoginModal(false);
    setUserType(signupUserType);
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
  };

  const handleNavigate = (page: AppState) => {
    setCurrentView(page);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'landing' && (
        <LandingPage onShowLogin={handleShowLogin} onNavigate={handleNavigate} />
      )}
      
      {currentView === 'about' && (
        <AboutPage onNavigate={handleNavigate} />
      )}
      
      {currentView === 'blog' && (
        <BlogPage onNavigate={handleNavigate} />
      )}
      
      {currentView === 'faqs' && (
        <FAQsPage onNavigate={handleNavigate} />
      )}
      
      {currentView === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {currentView === 'dashboard' && (
        <>
          {userType === 'business' ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <InfluencerDashboard onLogout={handleLogout} />
          )}
        </>
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </div>
  );
}

export default App;