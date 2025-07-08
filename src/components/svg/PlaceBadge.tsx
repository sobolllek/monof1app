import React from 'react';

interface PlaceBadgeProps {
  place: string | number;
  className?: string;
}

const PlaceBadge: React.FC<PlaceBadgeProps> = ({ 
  place = '#234',
  className = ''
}) => {
  return (
    <div className={`relative w-[148px] h-[38px] ${className}`}>
      <svg 
        className="absolute top-0 left-0 w-full h-full" 
        viewBox="0 0 148 42" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="147" height="41" rx="9.5" fill="#171717" stroke="url(#paint0_linear_250_1651)" />
        <defs>
          <linearGradient id="paint0_linear_250_1651" x1="74" y1="0" x2="74" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#383838"/> 
            <stop offset="1" stopColor="#131313"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-between px-4 text-sm w-full">
        <span className="text-white/20">Место:</span>
        <span className="text-white font-semibold font-fira">{typeof place === 'number' ? `#${place}` : place}</span>
      </div>
    </div>
  );
};

export default PlaceBadge;