import React from 'react';

interface BrandrLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const BrandrLogo: React.FC<BrandrLogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-10'
  };

  return (
    <img 
      src={size === 'sm' ? "/logo-icon.png" : "/logo.png"}
      alt="Brandr Logo" 
      className={sizeClasses[size]}
    />
  );
};

export default BrandrLogo; 