import React from 'react';

const ProfilePacksSection: React.FC = () => {
  return (
    <div className="relative" style={{ width: '378px', height: '59px' }}>
      {/* SVG background */}
      <svg
        width="378"
        height="59"
        viewBox="0 0 378 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <rect width="378" height="59" rx="22" fill="black" fillOpacity="0.4" />
        <rect
          x="0.75"
          y="0.75"
          width="376.5"
          height="57.5"
          rx="21.25"
          stroke="url(#paint0_linear)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="189"
            y1="0"
            x2="189"
            y2="59"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B8B8B8" />
            <stop offset="1" stopColor="#404040" />
          </linearGradient>
        </defs>
      </svg>

      {/* Texts aligned CENTER vertically, LEFT and RIGHT horizontally */}
      <div className="absolute top-0 left-5 right-4 bottom-0 flex items-center justify-between pointer-events-none">
        {/* Left: "Packs" */}
        <span
          className="text-[17px] font-bold text-white/30 leading-none"
          style={{ fontFamily: 'SF Pro Display' }}
        >
          Packs
        </span>

        {/* Right: "108" + Arrow */}
        <div className="flex items-center gap-2">
          <span
            className="text-[24px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-gray-500 to-white leading-none"
          >
            108
          </span>
          {/* Bigger Arrow SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/60"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfilePacksSection;
