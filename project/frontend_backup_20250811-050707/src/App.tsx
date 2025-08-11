import React, { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import LandingPage from './components/LandingPage';
import LoginModal from './components/auth/LoginModal';
import OnboardingFlow from './components/OnboardingFlow';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import FAQsPage from './components/FAQsPage';
import { authService } from './services/api';
import { User } from './types/auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'about' | 'blog' | 'faqs'>('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsLoggedIn(true);
          setCurrentPage('dashboard');
        } else {
          // Try to get current user from API
          const response = await authService.getCurrentUser();
          if (response.data) {
            setUser(response.data);
            setIsLoggedIn(true);
            setCurrentPage('dashboard');
          } else {
            // Clear invalid tokens
            authService.logout();
          }
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
    setShowLogin(false);
  };

  const handleSignup = () => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
    setShowLogin(false);
  };

  const handleLogout = async () => {
    await authService.logout();
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
      {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} user={user!} />}
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


