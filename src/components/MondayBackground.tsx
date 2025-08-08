import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MondayBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Create concentric arcs that extend well beyond the viewport
  const createArcPath = (radius: number, startAngle: number = -120, endAngle: number = 120) => {
    const centerX = -600; // Position center further off-screen to the left
    const centerY = -600; // Position center further off-screen above
    
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Generate concentric arcs that extend far beyond viewport
  const arcs = [];
  const baseRadius = 400; // Starting radius
  const radiusIncrement = 80; // Spacing between arcs
  const numArcs = 80; // More arcs to ensure they extend off-page
  
  for (let i = 0; i < numArcs; i++) {
    const radius = baseRadius + (i * radiusIncrement);
    const opacity = Math.max(0.02, 0.3 - (i * 0.003)); // Higher base opacity, slower fade
    const strokeWidth = i < 20 ? 1.0 : 0.8; // Slightly thicker for closer arcs
    
    arcs.push({
      id: i,
      radius,
      opacity,
      strokeWidth,
      path: createArcPath(radius, -120, 120), // Wider sweep to ensure off-page finish
      animationDelay: i * 0.02
    });
  }

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Extended SVG container to accommodate long arcs */}
      <motion.svg
        className="absolute inset-0 w-[400%] h-[400%] -top-[150%] -left-[150%]"
        viewBox="0 0 4000 3000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -30]),
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          rotate: {
            duration: 120, // 2 minutes for full rotation
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        {/* Render all concentric arcs */}
        {arcs.map((arc) => (
          <motion.path
            key={arc.id}
            d={arc.path}
            stroke="rgba(255, 255, 255, 0.9)"
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
              pathLength: { duration: 1.5, delay: arc.animationDelay, ease: "easeOut" },
              opacity: { duration: 0.8, delay: arc.animationDelay }
            }}
            style={{
              filter: 'blur(0.2px)',
            }}
          />
        ))}
        
        {/* Additional fine detail arcs for authenticity */}
        {Array.from({ length: 50 }, (_, i) => {
          const radius = baseRadius + (i * radiusIncrement) + (radiusIncrement / 2);
          const opacity = Math.max(0.015, 0.2 - (i * 0.002));
          
          return (
            <motion.path
              key={`detail-${i}`}
              d={createArcPath(radius, -115, 115)}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth={0.6}
              fill="none"
              opacity={opacity}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: opacity,
              }}
              transition={{
                pathLength: { duration: 1.8, delay: i * 0.03, ease: "easeOut" },
                opacity: { duration: 1.0, delay: i * 0.03 }
              }}
              style={{
                filter: 'blur(0.3px)',
              }}
            />
          );
        })}
      </motion.svg>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/3 pointer-events-none" />
    </div>
  );
};

export default MondayBackground;