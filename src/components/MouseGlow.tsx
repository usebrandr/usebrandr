import React, { useEffect, useRef } from 'react';

const MouseGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-40 blur-2xl transition-all duration-300 ease-out"
      style={{
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default MouseGlow; 