const SvgTallCardBlock = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`relative overflow-hidden rounded-[22px] bg-black/40 ${className}`}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect width="100%" height="100%" rx="22" fill="black" fillOpacity="0.4" />
            <rect
              x="0.75"
              y="0.75"
              width="calc(100% - 1.5px)"
              height="calc(100% - 1.5px)"
              rx="21.25"
              stroke="url(#paint0_linear)"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#B8B8B8" />
                <stop offset="1" stopColor="#404040" />
              </linearGradient>
            </defs>
          </svg>
        </div>
  
        <div className="relative z-10 p-4">{children}</div>
      </div>
    );
  };
  
  
  export default SvgTallCardBlock;
  