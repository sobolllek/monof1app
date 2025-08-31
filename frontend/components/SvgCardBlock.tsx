const SvgCardBlock = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`relative overflow-hidden rounded-[22px] ${className}`}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 163 163"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="163" height="163" rx="22" fill="black" fillOpacity="0.4" />
          <rect
            x="0.75"
            y="0.75"
            width="161.5"
            height="161.5"
            rx="21.25"
            stroke="url(#paint0_linear_397_1334)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient
              id="paint0_linear_397_1334"
              x1="81.5"
              y1="0"
              x2="81.5"
              y2="163"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B8B8B8" />
              <stop offset="1" stopColor="#404040" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative z-10 p-4">{children}</div>
      </div>
    );
  };
  
  export default SvgCardBlock;
  