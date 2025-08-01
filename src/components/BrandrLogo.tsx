import React from 'react';

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
  const iconSrc = '/src/assets/logo-icon.png';
  const brandrSrc = '/src/assets/logo-brandr.png';

  return (
    <img
      src={iconOnly ? iconSrc : brandrSrc}
      alt={iconOnly ? 'Brandr Logo Icon' : 'Brandr Logo'}
      className={`${sizeClasses[size]} ${className}`}
      style={{ objectFit: 'contain', width: 'auto' }}
    />
  );
};

export default BrandrLogo; 