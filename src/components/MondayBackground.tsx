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
    const centerX = -2000; // Position center much further off-screen to the left (10x extension)
    const centerY = -2000; // Position center much further off-screen above (10x extension)
    
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Generate multiple concentric arcs with Monday.com spacing - extended 10x
  const arcs = [];
  const baseRadius = 3000; // 10x larger base radius
  const radiusIncrement = 600; // 10x larger spacing between arcs
  const numArcs = 50; // More arcs to fill the extended area
  
  for (let i = 0; i < numArcs; i++) {
    const radius = baseRadius + (i * radiusIncrement);
    const opacity = Math.max(0.08, 0.4 - (i * 0.008)); // Much higher base opacity, more visible
    const strokeWidth = i < 10 ? 1.2 : 1.0; // Slightly thicker for better visibility
    
    arcs.push({
      id: i,
      radius,
      opacity,
      strokeWidth,
      path: createArcPath(radius, -80, 80), // Wider arc sweep for better coverage
      animationDelay: i * 0.05 // Faster animation sequence
    });
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Main SVG container - much larger to accommodate 10x extension */}
      <motion.svg
        className="absolute inset-0 w-[500%] h-[500%] -top-[200%] -left-[200%]"
        viewBox="0 0 10000 7500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
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
              filter: 'blur(0.2px)', // Less blur for sharper visibility
            }}
          />
        ))}
        
        {/* Additional fine detail arcs for authenticity - also extended */}
        {Array.from({ length: 30 }, (_, i) => {
          const radius = baseRadius + (i * radiusIncrement) + (radiusIncrement / 2);
          const opacity = Math.max(0.04, 0.2 - (i * 0.006)); // Higher opacity for detail arcs
          
          return (
            <motion.path
              key={`detail-${i}`}
              d={createArcPath(radius, -70, 70)}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth={0.8}
              fill="none"
              opacity={opacity}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: opacity,
              }}
              transition={{
                pathLength: { duration: 2, delay: i * 0.08, ease: "easeOut" },
                opacity: { duration: 1, delay: i * 0.08 }
              }}
              style={{
                filter: 'blur(0.3px)',
              }}
            />
          );
        })}
      </motion.svg>
      
      {/* Subtle gradient overlay to enhance the effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

export default MondayBackground;