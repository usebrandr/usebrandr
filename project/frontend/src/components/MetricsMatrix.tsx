import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  '+342%', '4.2x', '8.2M', '156K', '2.4M', '89K', '6.8%', '3.2x', '1.2M', '+156%',
  '2.1x', '4.8M', '7.5%', '2.8x', '1.8M', '234K', '8.2%', '4.1x', '2.1M', '+189%',
  '3.2x', '6.2M', '9.1%', '3.5x', '2.9M', '456K', '10.2%', '5.2x', '3.8M', '+245%',
  '1.8x', '3.1M', '5.4%', '2.3x', '1.5M', '123K', '7.1%', '3.8x', '2.7M', '+178%'
];

const MetricsMatrix: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create matrix of metrics
  const matrixItems = metrics.map((metric, index) => ({
    id: index,
    metric,
    x: (index % 10) * 10, // 10 columns
    y: Math.floor(index / 10) * 15, // 15 rows
    color: index % 4 === 0 ? 'text-blue-400' : 
           index % 4 === 1 ? 'text-purple-400' : 
           index % 4 === 2 ? 'text-cyan-400' : 'text-green-400'
  }));

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
      {matrixItems.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute text-sm font-mono ${item.color}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            x: useTransform(scrollYProgress, [0, 1], [0, Math.sin(item.id) * 150]),
            y: useTransform(scrollYProgress, [0, 1], [0, Math.cos(item.id) * 80]),
            rotateZ: useTransform(scrollYProgress, [0, 1], [0, 360]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.5, 0.6]),
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.05, 0.4, 0.4, 0.05])
          }}
        >
          {item.metric}
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsMatrix; 