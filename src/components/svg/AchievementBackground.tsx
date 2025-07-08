import React from 'react';

interface Achievement {
  title: string;
  completed: boolean;
}

interface AchievementBackgroundProps {
  width?: number | string;
  itemHeight?: number;
  achievements: Achievement[];
  category?: string;
  className?: string;
  currentAchievementCategory: string;
  switchCategory: (direction: 'prev' | 'next') => void;
}

const CheckIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5092 0.211885L13.7776 0.467653C14.0741 0.750166 14.0741 1.20821 13.7776 1.49072L5.06932 9.78812C4.77281 10.0706 4.29209 10.0706 3.99558 9.78812L0.222378 6.19296C-0.074126 5.91044 -0.074126 5.4524 0.222378 5.16988L0.490812 4.91412C0.787316 4.6316 1.26804 4.6316 1.56455 4.91412L3.99558 7.23044C4.29209 7.51295 4.77281 7.51295 5.06932 7.23044L12.4355 0.211885C12.732 -0.0706283 13.2127 -0.0706283 13.5092 0.211885Z" fill="white" />
  </svg>
);

const CrossIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
      <rect width="17" height="17" fill="url(#pattern0)" />
    </mask>
    <g mask="url(#mask0)">
      <rect width="17" height="17" fill="#505050" />
    </g>
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0" transform="scale(0.0111111)" />
      </pattern>
      <image
        id="image0"
        width="90"
        height="90"
        preserveAspectRatio="none"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACA0lEQVR4nO2cQU7DMBBFswIuOOuu7J2vQXseFlEuVOAWgywFqQKEoLHH88f/Sd6wen5K3USksyyEEEIIIYQQQggh5BullMeU0iWl9LavS/0bSqqC4C8iDymll5yzflnb6XR6WpwD4f+LpD9ZVP8/SPqRRfX/h6QOl0X1v0NSPcWG8K/fxDnn9Q5J3dc68tscxr/e9hyQ1JGxG0T+XOfusvUes4GoWh8jB46Ln9Y7Umi1it04cl3X3s5L/dg0FNbex0jD4+J2Pffy7S2+9oiN5Gr1UdTWxwiCI/xGxLFbmA2JQ6cmeNqYOHLpgocNigMHE0ZuVGaJPHLDMlvkERuXWSNbBpDZI1uEEEa2eQTOyI/Vveh09enUxwVg7C1MZMext3CRHcaOG9lR7PiRHcSeJ/LA2PNFHhB73siGsRnZIDYj38LQBgiPjhCRdfojRHh7F+pK1mmvbOEj+BSRNfyVLX4ix40t/iLHi+04soaJzX/OGsDXDQzgCzQG8JUwA/iSowF8bdcAD+/CiQOHrnjaoDhyaYrHjYlDp0N43pA4dgu3EQFwDPOz3wLk2mteh1qJd4oNNa9DgcdIQM3r2IAHo8DM61jBR/1AzOtYObwq0jizKP4QA/qi+EOMnIziDzFENYo/xFjgKP773Ui99Xvd1xnpZ78F3J8QQgghhBBCCCFkMeQDxDui8g7UqesAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

const horizontalPadding = 20;

const DividerLine = () => (
  <svg width="374" height="2" viewBox="0 0 374 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="1.25" x2="374" y2="1.25" stroke="url(#paint0_linear_327_1811)" stroke-width="1.5"/>
    <defs>
      <linearGradient id="paint0_linear_327_1811" x1="374" y1="2.5" x2="0" y2="2.5" gradientUnits="userSpaceOnUse">
        <stop/>
        <stop offset="0.197115" stop-color="#2E2E2E"/>
        <stop offset="0.802885" stop-color="#282828"/>
        <stop offset="1"/>
      </linearGradient>
    </defs>
  </svg>
);

const AchievementBackground: React.FC<AchievementBackgroundProps> = ({
  width = 380,
  itemHeight = 30,
  achievements,
  category = 'Achievements',
  className = '',
  currentAchievementCategory,
  switchCategory
}) => {
  const paddingTop = 55;
  const paddingBottom = 12;
  const spacing = 5;

  const contentHeight = achievements.length * (itemHeight + spacing) - spacing;
  const totalHeight = paddingTop + contentHeight + paddingBottom;

  return (
    <div className={`relative max-w-[380px] w-full ${className}`} style={{ height: totalHeight }}>
      {/* Категории Переключение */}
      <div className="absolute top-4 left-5 right-5 z-10 flex justify-between items-center">
      <div className="text-white/30 text-[17px] font-bold font-sans">Achievements</div>
      <div className="flex items-center gap-[2px] text-sm text-gray-400">
        <div
          onClick={() => switchCategory('prev')}
          className="p-1 hover:bg-gray-800/50 rounded cursor-pointer"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.81501 0.17229C6.06166 0.40201 6.06166 0.77446 5.81501 1.00418L1.52477 5L5.81501 8.99582C6.06166 9.22554 6.06166 9.59799 5.81501 9.82771C5.56837 10.0574 5.16847 10.0574 4.92183 9.82771L0.184986 5.41595C-0.0616617 5.18623 -0.0616617 4.81378 0.184986 4.58405L4.92183 0.17229C5.16847 -0.0574301 5.56837 -0.0574301 5.81501 0.17229Z"
              fill="white"
            />
          </svg>
        </div>

        <span className="min-w-[70px] text-center font-formulaDisplay font-black text-white text-[13px]">
          {currentAchievementCategory}
        </span>

        <div
          onClick={() => switchCategory('next')}
          className="p-1 hover:bg-gray-800/50 rounded cursor-pointer rotate-180"
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.81501 0.17229C6.06166 0.40201 6.06166 0.77446 5.81501 1.00418L1.52477 5L5.81501 8.99582C6.06166 9.22554 6.06166 9.59799 5.81501 9.82771C5.56837 10.0574 5.16847 10.0574 4.92183 9.82771L0.184986 5.41595C-0.0616617 5.18623 -0.0616617 4.81378 0.184986 4.58405L4.92183 0.17229C5.16847 -0.0574301 5.56837 -0.0574301 5.81501 0.17229Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>

      {/* SVG Background */}
      <svg
        width="100%"
        height={totalHeight}
        viewBox={`0 0 380 ${totalHeight}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-2xl block"
      >

        {achievements.map((achievement, index) => {
          const y = paddingTop + index * (itemHeight + spacing);
          return (
            <g key={index}>
              <text
                x={horizontalPadding}
                y={y + itemHeight / 2 + 5}
                fill={achievement.completed ? "#FFFFFF" : "#505050"}
                fontSize="13"
                fontFamily="'SF Pro Display Regular', sans-serif"
              >
                {achievement.title}
              </text>
              <foreignObject
                x={Number(width) - horizontalPadding - 20}
                y={y + itemHeight / 2 - 8}
                width="20"
                height="20"
              >
                <div className="flex items-center justify-center">
                  {achievement.completed ? <CheckIcon /> : <CrossIcon />}
                </div>
              </foreignObject>
              {index < achievements.length - 1 && (
               <g transform={`translate(${(380 - 376) / 2}, ${y + itemHeight + spacing/2 - 1})`}>
                <DividerLine />
              </g>
              )}
            </g>
          );
        })}

        <defs>
          <linearGradient
            id="paint0_linear"
            x1={Number(width) / 2}
            y1="0"
            x2={Number(width) / 2}
            y2={totalHeight}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B8B8B8" />
            <stop offset="1" stopColor="#404040" />
          </linearGradient>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width={Number(width) - 1.5}
          height={totalHeight - 1.5}
          rx="21.25"
          stroke="url(#paint0_linear)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default AchievementBackground;
