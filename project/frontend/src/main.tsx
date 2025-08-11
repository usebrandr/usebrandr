import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';  // Changed to './components/App' since App.tsx is in components folder
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);