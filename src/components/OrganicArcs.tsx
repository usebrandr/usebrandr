import React, { useEffect, useState } from 'react';

const OrganicArcs: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scale based on scroll position
  const baseScale = 1;
  const maxScale = 2;
  const scrollThreshold = 1000; // pixels scrolled to reach max scale
  const scale = Math.min(baseScale + (scrollY / scrollThreshold) * (maxScale - baseScale), maxScale);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'visible'
      }}
    >
      {/* Bottom Right - Original */}
      <img
        src="/debug-image.webp"
        alt="Bottom right decoration"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-100px',
          width: '1000px',
          height: '1000px',
          opacity: 1,
          filter: 'brightness(1.2) contrast(1.1) saturate(1.1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))',
          pointerEvents: 'none',
          objectFit: 'cover',
          transform: `translateY(-50%) scale(${scale})`,
          transition: 'transform 0.1s ease-out',
          animation: 'float 8s ease-in-out infinite'
        }}
        onError={(e) => {
          console.error('Image failed to load:', e);
        }}
        onLoad={() => {
          console.log('Image loaded successfully');
        }}
      />
      
                        {/* Top Left - Different Image */}
                  <img
                    src="/top-left-new.webp"
                    alt="Top left decoration"
                    style={{
                      position: 'absolute',
                      top: '100px',
                      left: '0px',
                      width: '600px',
                      height: '600px',
                      opacity: 1,
                      filter: 'brightness(1.2) contrast(1.1) saturate(1.1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))',
                      pointerEvents: 'none',
                      objectFit: 'cover',
                      transform: `scale(${scale})`,
                      transition: 'transform 0.1s ease-out',
                      animation: 'float 8s ease-in-out infinite'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully');
                    }}
                  />
      

    </div>
  );
};

export default OrganicArcs;
