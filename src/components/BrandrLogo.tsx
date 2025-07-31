import React from 'react';
import logoIcon from '../assets/logo-icon.png';
import logoBrandr from '../assets/logo-brandr.png';

interface BrandrLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white'; // color for light bg, white for dark bg
  iconOnly?: boolean; // just the icon, no text
}

const BrandrLogo: React.FC<BrandrLogoProps> = ({ className = '', size = 'md', variant = 'color', iconOnly = false }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
  };

  // Apply filter for white variant on dark backgrounds
  const filterStyle = variant === 'white' ? { filter: 'brightness(0) invert(1)' } : {};

  return (
    <img
      src={iconOnly ? logoIcon : logoBrandr}
      alt={iconOnly ? 'Brandr Logo Icon' : 'Brandr Logo'}
      className={`${sizeClasses[size]} ${className}`}
      style={{ objectFit: 'contain', width: 'auto', ...filterStyle }}
    />
  );
};

export default BrandrLogo; 