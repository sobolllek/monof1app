import React from 'react';

interface CardBackgroundProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const CardBackground: React.FC<CardBackgroundProps> = ({ 
  width = 184, 
  height = 183,
  className = ''
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 184 183" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-2xl ${className}`}
    >
      <rect width="183" height="183" rx="22" fill="black" fillOpacity="0.4"/>
      <rect x="0.75" y="0.75" width="181.5" height="181.5" rx="21.25" stroke="url(#paint0_linear_397_1334)" strokeOpacity="0.3" strokeWidth="1.5"/>
      <defs>
        <linearGradient id="paint0_linear_397_1334" x1="91.5" y1="0" x2="91.5" y2="183" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8B8B8"/>
          <stop offset="1" stopColor="#404040"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CardBackground;
