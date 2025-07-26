import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import LoginModal from './LoginModal';
import Dashboard from './Dashboard';
import InfluencerDashboard from './InfluencerDashboard';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import FAQsPage from './FAQsPage';
import { api, tokenManager } from '../utils/api';

type UserType = 'business' | 'influencer';
type AppState = 'landing' | 'dashboard' | 'about' | 'blog' | 'faqs';

interface User {
  id: number;
  username: string;
  email: string;
  user_type: UserType;
  is_verified: boolean;
  profile?: any;
}

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (tokenManager.isAuthenticated()) {
        try {
          const response = await api.auth.getProfile();
          if (response.data?.user) {
            setUser(response.data.user);
            setAppState('dashboard');
          } else {
            // Invalid token, clear it
            tokenManager.clearTokens();
            setAppState('landing');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          tokenManager.clearTokens();
          setAppState('landing');
        }
      } else {
        setAppState('landing');
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (userType: UserType) => {
    setShowLogin(false);

    // Fetch user profile after login
    api.auth.getProfile().then(response => {
      if (response.data?.user) {
        setUser(response.data.user);
        setAppState('dashboard');
      }
    });
  };

  const handleSignupSuccess = (userType: UserType) => {
    setShowLogin(false);

    // After signup, go directly to dashboard
    api.auth.getProfile().then(response => {
      if (response.data?.user) {
        setUser(response.data.user);
        setAppState('dashboard');
      }
    });
  };

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setAppState('landing');
    }
  };

  const handleNavigate = (page: AppState) => {
    setAppState(page);
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#f5f5f5]/20 border-t-[#f5f5f5] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#f5f5f5]/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Render appropriate component based on app state
  switch (appState) {
    case 'dashboard':
      if (!user) {
        setAppState('landing');
        return null;
      }

      return user.user_type === 'business' ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <InfluencerDashboard onLogout={handleLogout} />
      );

    case 'about':
      return <AboutPage onNavigate={handleNavigate} />;

    case 'blog':
      return <BlogPage onNavigate={handleNavigate} />;

    case 'faqs':
      return <FAQsPage onNavigate={handleNavigate} />;

    case 'landing':
    default:
      return (
        <>
          <LandingPage
            onShowLogin={handleShowLogin}
            onNavigate={handleNavigate}
            onSignup={handleSignupSuccess}
          />
          {showLogin && (
            <LoginModal
              onClose={handleCloseLogin}
              onLogin={handleLoginSuccess}
              onSignup={handleSignupSuccess}
            />
          )}
        </>
      );
  }
}

export default App;