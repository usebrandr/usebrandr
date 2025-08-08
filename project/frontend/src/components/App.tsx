import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import LoginModal from './LoginModal';
import OnboardingFlow from './OnboardingFlow';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import FAQsPage from './FAQsPage';
import { api } from '../utils/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'about' | 'blog' | 'faqs'>('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (api.auth.isAuthenticated()) {
        const storedUser = api.auth.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsLoggedIn(true);
          setCurrentPage('dashboard');
        } else {
          // Try to get current user from API
          const response = await api.auth.getCurrentUser();
          if (response.data) {
            setUser(response.data);
            setIsLoggedIn(true);
            setCurrentPage('dashboard');
          } else {
            // Clear invalid tokens
            api.auth.logout();
          }
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    const storedUser = api.auth.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
    setShowLogin(false);
  };

  const handleSignup = () => {
    const storedUser = api.auth.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
    setShowLogin(false);
  };

  const handleLogout = async () => {
    await api.auth.logout();
    setIsLoggedIn(false);
    setUser(null);
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

  return (
    <>
      {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} user={user} />}
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