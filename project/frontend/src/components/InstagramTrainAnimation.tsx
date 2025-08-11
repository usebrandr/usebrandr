import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  '+342%', '4.2x', '8.2M', '156K', '2.4M', '89K', '6.8%', '3.2x', '1.2M', '+156%',
  '2.1x', '4.8M', '7.5%', '2.8x', '1.8M', '234K', '8.2%', '4.1x', '2.1M', '+189%',
  '3.2x', '6.2M', '9.1%', '3.5x', '2.9M', '456K', '10.2%', '5.2x', '3.8M', '+245%'
];

const MetricWeb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create animated node field
  const nodes = metrics.map((metric, index) => ({
    id: index,
    metric,
    x: 50 + Math.random() * 40, // Spread across screen
    y: 10 + Math.random() * 80, // Spread vertically
    size: 3 + Math.random() * 4, // Varying sizes
    color: index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'blue' : 'violet',
    pulseDelay: Math.random() * 2,
    connections: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => 
      Math.floor(Math.random() * metrics.length)
    )
  }));

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-[180vh] overflow-hidden bg-gradient-to-b from-black to-gray-800">
      {/* Animated Network Connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {nodes.map((node) => (
          node.connections.map((connectionId) => {
            const targetNode = nodes[connectionId];
            return (
              <motion.line
                key={`${node.id}-${connectionId}`}
                x1={node.x + '%'}
                y1={node.y + '%'}
                x2={targetNode.x + '%'}
                y2={targetNode.y + '%'}
                stroke={`url(#${node.color}Gradient)`}
                strokeWidth="1"
                style={{
                  opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.4]),
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  strokeWidth: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            );
          })
        ))}
        
        {/* Gradients for glowing effect */}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated Metric Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: useTransform(scrollYProgress, [0, 1], [`${node.x}%`, `${node.x - 5}%`]),
            top: useTransform(scrollYProgress, [0, 1], [`${node.y}%`, `${node.y - 3}%`]),
            rotateZ: useTransform(scrollYProgress, [0, 1], [0, 360]),
            scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.2]),
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 0.8, 0]),
            z: useTransform(scrollYProgress, [0, 1], [0, 300])
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: node.pulseDelay
          }}
        >
          <div 
            className={`backdrop-blur-sm rounded-sm px-2 py-1 border text-xs font-medium shadow-lg ${
              node.color === 'purple' ? 'bg-purple-500/20 border-purple-400/50 text-purple-300' :
              node.color === 'blue' ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' :
              'bg-violet-500/20 border-violet-400/50 text-violet-300'
            }`}
            style={{
              width: `${node.size * 6}px`,
              height: `${node.size * 3}px`,
              boxShadow: `0 0 ${node.size * 2}px ${node.color === 'purple' ? '#a855f7' : node.color === 'blue' ? '#3b82f6' : '#8b5cf6'}40`
            }}
          >
            {node.metric}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricWeb; 