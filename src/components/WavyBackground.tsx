import React from 'react';

const WavyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-left wavy lines - Monday style */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main flowing curve from top-left */}
          <path
            d="M0 300 Q200 150 400 300 T800 300"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            className="animate-pulse"
          />
          <path
            d="M0 250 Q200 100 400 250 T800 250"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <path
            d="M0 350 Q200 200 400 350 T800 350"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>

      {/* Top-right wavy lines - Monday style */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main flowing curve from top-right */}
          <path
            d="M800 300 Q600 150 400 300 T0 300"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            className="animate-pulse"
          />
          <path
            d="M800 250 Q600 100 400 250 T0 250"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
          <path
            d="M800 350 Q600 200 400 350 T0 350"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
            className="animate-pulse"
            style={{ animationDelay: '2.5s' }}
          />
        </svg>
      </div>

      {/* Additional flowing curves for depth */}
      <div className="absolute top-20 left-0 w-full h-full opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200 Q300 100 600 200 T800 200"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <path
            d="M0 400 Q300 300 600 400 T800 400"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
            className="animate-pulse"
            style={{ animationDuration: '5s' }}
          />
        </svg>
      </div>

      {/* CSS-based flowing lines for additional movement */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-0 w-96 h-96 opacity-15">
          <div className="wavy-line-1"></div>
        </div>
        <div className="absolute top-20 right-0 w-96 h-96 opacity-15">
          <div className="wavy-line-2"></div>
        </div>
      </div>
    </div>
  );
};

export default WavyBackground;
