import React from 'react';

const ProfilePacksSection: React.FC = () => {
  const width = 380;
  const height = 59;

  return (
    <div className="relative w-full max-w-[380px]" style={{ height }}>
      {/* SVG background */}
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <rect width={width} height={height} rx="22" fill="black" fillOpacity="0.4" />
        <rect
          x="0.75"
          y="0.75"
          width={width - 3}
          height={height - 3}
          rx="21.25"
          stroke="url(#paint0_linear)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1={width / 2}
            y1="0"
            x2={width / 2}
            y2={height}
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
        <span className="text-white/30 text-[17px] font-bold font-sans">
          Packs
        </span>

        {/* Right: "108" + Arrow */}
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-gray-500 to-white leading-none">
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
