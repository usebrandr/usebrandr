import React from 'react';

interface BrandrLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const BrandrLogo: React.FC<BrandrLogoProps> = ({ size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8', 
    lg: 'h-10'
  };

  return (
    <img 
      src={size === 'sm' ? "/logo-icon.png" : "/logo.png"}
      alt="Brandr Logo" 
      className={`${sizeClasses[size]} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
    />
  );
};

export default BrandrLogo; 