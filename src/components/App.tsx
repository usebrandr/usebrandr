import { useState } from 'react';
import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import FAQsPage from './FAQsPage';
import ContactPage from './ContactPage';

import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsOfServicePage from './TermsOfServicePage';
import CookiePolicyPage from './CookiePolicyPage';

type AppState = 'landing' | 'about' | 'faqs' | 'contact' | 'privacy' | 'terms' | 'cookies';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  const handleNavigate = (state: AppState) => {
    setAppState(state);
  };

                switch (appState) {
                case 'about':
                  return <AboutPage onNavigate={handleNavigate} />;
                case 'faqs':
                  return <FAQsPage onNavigate={handleNavigate} />;
                case 'contact':
                  return <ContactPage onNavigate={handleNavigate} />;

                case 'privacy':
                  return <PrivacyPolicyPage onNavigate={handleNavigate} />;
                case 'terms':
                  return <TermsOfServicePage onNavigate={handleNavigate} />;
                case 'cookies':
                  return <CookiePolicyPage onNavigate={handleNavigate} />;
                case 'landing':
                default:
                  return <LandingPage onNavigate={handleNavigate} />;
              }
}

export default App;