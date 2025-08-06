import React, { useState } from 'react';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import LoginModal from './LoginModal';
import OnboardingFlow from './OnboardingFlow';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import FAQsPage from './FAQsPage';
import InfluencerDashboard from './InfluencerDashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'influencer-dashboard' | 'about' | 'blog' | 'faqs'>('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false to show landing page by default
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');

  const handleLogin = (userType: 'business' | 'influencer') => {
    console.log('Login successful, userType:', userType);
    setIsLoggedIn(true);
    setShowLogin(false);
    setUserType(userType);
    setCurrentPage('dashboard'); // Set currentPage to dashboard when logging in
    console.log('App state updated - isLoggedIn:', true, 'userType:', userType, 'currentPage: dashboard');
  };

  const handleSignup = (userType: 'business' | 'influencer') => {
    setShowOnboarding(true);
    setUserType(userType);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleNavigate = (page: 'landing' | 'about' | 'blog' | 'faqs') => {
    setCurrentPage(page);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setIsLoggedIn(true);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (!isLoggedIn) {
    return (
      <>
        {currentPage === 'landing' && (
          <LandingPage 
            onShowLogin={() => setShowLogin(true)}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
        {currentPage === 'faqs' && <FAQsPage onNavigate={handleNavigate} />}
        
        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
      </>
    );
  }

  if (userType === 'influencer') {
    console.log('Rendering InfluencerDashboard');
    return <InfluencerDashboard onLogout={handleLogout} />;
  }

  console.log('Rendering business dashboard, currentPage:', currentPage);
  return (
    <>
      {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} />}
      {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
      {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
      {currentPage === 'faqs' && <FAQsPage onNavigate={handleNavigate} />}
      
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </>
  );
};

export default App; 