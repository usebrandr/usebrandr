import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MondayBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Create organic, hand-drawn style arc paths with subtle imperfections
  const createOrganicArcPath = (
    centerX: number, 
    centerY: number, 
    baseRadius: number, 
    startAngle: number = -90, 
    endAngle: number = 90,
    imperfectionSeed: number = 0
  ) => {
    // Add subtle variations to make arcs feel hand-drawn
    const radiusVariation = 0.05 + (Math.sin(imperfectionSeed * 3.14159) * 0.03); // 2-8% variation
    const ellipseRatio = 0.85 + (Math.cos(imperfectionSeed * 2.1) * 0.1); // Slight elliptical distortion
    const angleOffset = Math.sin(imperfectionSeed * 1.7) * 3; // Small angle wobble
    
    // Create multiple control points for organic curve
    const points = [];
    const numPoints = 8; // More points for smoother organic curves
    
    for (let i = 0; i <= numPoints; i++) {
      const progress = i / numPoints;
      const angle = startAngle + (endAngle - startAngle) * progress + angleOffset * Math.sin(progress * 3.14159);
      
      // Add subtle radius variations along the arc
      const localRadiusVar = 1 + (Math.sin(progress * 6.28 + imperfectionSeed) * 0.02);
      const radius = baseRadius * (1 + radiusVariation) * localRadiusVar;
      
      const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      const y = centerY + radius * ellipseRatio * Math.sin((angle * Math.PI) / 180);
      
      points.push({ x, y });
    }
    
    // Create smooth path using quadratic curves for organic feel
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = current.x + (next.x - current.x) * 0.5;
      const controlY = current.y + (next.y - current.y) * 0.5;
      
      path += ` Q ${current.x} ${current.y} ${controlX} ${controlY}`;
    }
    
    // Final point
    const lastPoint = points[points.length - 1];
    path += ` T ${lastPoint.x} ${lastPoint.y}`;
    
    return path;
  };

  // Generate organic arcs for top-left corner
  const topLeftArcs = [];
  const baseRadius = 400;
  const radiusIncrement = 120;
  const numArcs = 6;
  
  for (let i = 0; i < numArcs; i++) {
    const radius = baseRadius + (i * radiusIncrement);
    const opacity = Math.max(0.03, 0.10 - (i * 0.012));
    const strokeWidth = i < 3 ? 1.0 : 0.8;
    const imperfectionSeed = i * 2.3 + 1.7; // Different seed for each arc
    
    topLeftArcs.push({
      id: `tl-${i}`,
      radius,
      opacity,
      strokeWidth,
      path: createOrganicArcPath(-1000, -1000, radius, -100, 80, imperfectionSeed),
      animationDelay: i * 0.15
    });
  }

  // Generate organic arcs for bottom-right corner (mirrored)
  const bottomRightArcs = [];
  
  for (let i = 0; i < numArcs; i++) {
    const radius = baseRadius + (i * radiusIncrement);
    const opacity = Math.max(0.03, 0.10 - (i * 0.012));
    const strokeWidth = i < 3 ? 1.0 : 0.8;
    const imperfectionSeed = i * 2.7 + 3.1; // Different seed pattern
    
    bottomRightArcs.push({
      id: `br-${i}`,
      radius,
      opacity,
      strokeWidth,
      path: createOrganicArcPath(2000, 1500, radius, 100, 280, imperfectionSeed),
      animationDelay: i * 0.15 + 0.5
    });
  }

  const allArcs = [...topLeftArcs, ...bottomRightArcs];

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <motion.svg
        className="absolute inset-0 w-[400%] h-[400%] -top-[150%] -left-[150%]"
        viewBox="0 0 4000 3000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -30]),
        }}
      >
        {/* Render all organic arcs */}
        {allArcs.map((arc) => (
          <motion.path
            key={arc.id}
            d={arc.path}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={arc.strokeWidth}
            fill="none"
            opacity={arc.opacity}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: arc.opacity,
            }}
            transition={{
              pathLength: { duration: 2.0, delay: arc.animationDelay, ease: "easeOut" },
              opacity: { duration: 1.0, delay: arc.animationDelay }
            }}
            style={{
              filter: 'blur(0.1px)', // Very subtle blur for organic feel
            }}
          />
        ))}
      </motion.svg>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/2 pointer-events-none" />
    </div>
  );
};

export default MondayBackground;