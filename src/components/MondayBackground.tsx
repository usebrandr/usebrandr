import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MondayBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Create concentric arcs with precise spacing and curvature matching Monday.com
  const createArcPath = (radius: number, startAngle: number = -45, endAngle: number = 45) => {
    const centerX = -200; // Position center off-screen to the left
    const centerY = -200; // Position center off-screen above
    
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Generate multiple concentric arcs with Monday.com spacing
  const arcs = [];
  const baseRadius = 300;
  const radiusIncrement = 60; // Spacing between arcs
  const numArcs = 25; // Enough arcs to fill the screen
  
  for (let i = 0; i < numArcs; i++) {
    const radius = baseRadius + (i * radiusIncrement);
    const opacity = Math.max(0.02, 0.15 - (i * 0.006)); // Fade out as radius increases
    const strokeWidth = i < 5 ? 0.8 : 0.6; // Slightly thicker for inner arcs
    
    arcs.push({
      id: i,
      radius,
      opacity,
      strokeWidth,
      path: createArcPath(radius, -60, 60), // Wider arc sweep
      animationDelay: i * 0.1
    });
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Main SVG container - oversized to ensure arcs start off-screen */}
      <motion.svg
        className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4"
        viewBox="0 0 2000 1500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
      >
        {/* Render all concentric arcs */}
        {arcs.map((arc) => (
          <motion.path
            key={arc.id}
            d={arc.path}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth={arc.strokeWidth}
            fill="none"
            opacity={arc.opacity}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: arc.opacity,
            }}
            transition={{
              pathLength: { duration: 2, delay: arc.animationDelay, ease: "easeOut" },
              opacity: { duration: 1, delay: arc.animationDelay }
            }}
            style={{
              filter: 'blur(0.3px)', // Subtle blur for softer appearance
            }}
          />
        ))}
        
        {/* Additional fine detail arcs for authenticity */}
        {Array.from({ length: 15 }, (_, i) => {
          const radius = baseRadius + (i * radiusIncrement) + (radiusIncrement / 2);
          const opacity = Math.max(0.01, 0.08 - (i * 0.004));
          
          return (
            <motion.path
              key={`detail-${i}`}
              d={createArcPath(radius, -50, 50)}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={0.4}
              fill="none"
              opacity={opacity}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: opacity,
              }}
              transition={{
                pathLength: { duration: 2.5, delay: i * 0.15, ease: "easeOut" },
                opacity: { duration: 1.2, delay: i * 0.15 }
              }}
              style={{
                filter: 'blur(0.5px)',
              }}
            />
          );
        })}
      </motion.svg>
      
      {/* Subtle gradient overlay to enhance the effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default MondayBackground;