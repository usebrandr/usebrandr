import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import WaitlistModal from './components/WaitlistModal';

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="App">
      <LandingPage onJoinWaitlist={() => setIsWaitlistOpen(true)} />
      {isWaitlistOpen && (
        <WaitlistModal onClose={() => setIsWaitlistOpen(false)} />
      )}
    </div>
  );
}

export default App;
