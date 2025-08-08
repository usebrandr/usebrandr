import React, { useState } from 'react';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import LoginModal from './LoginModal';
import OnboardingFlow from './OnboardingFlow';
import AboutPage from './AboutPage';
import FAQsPage from './FAQsPage';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import ContactPage from './ContactPage';
import InfluencerDashboard from './InfluencerDashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'influencer-dashboard' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact'>('landing');
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

  const handleNavigate = (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => {
    setCurrentPage(page);
    // Scroll to top when navigating to a new page
    window.scrollTo(0, 0);
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
        {currentPage === 'faqs' && <FAQsPage onNavigate={handleNavigate} />}
        {currentPage === 'terms' && <TermsPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        
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