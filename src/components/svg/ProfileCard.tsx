import React from "react";

interface ProfileCardProps {
  children?: React.ReactNode;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative w-[378px] h-[101px] ${className}`}>
      {/* SVG Background */}
      <svg
        width="378"
        height="101"
        viewBox="0 0 378 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <rect width="378" height="101" rx="22" fill="black" fillOpacity="0.4" />
        <rect
          x="0.75"
          y="0.75"
          width="376.5"
          height="99.5"
          rx="21.25"
          stroke="url(#paint0_linear_471_1432)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear_471_1432"
            x1="189"
            y1="0"
            x2="189"
            y2="101"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B8B8B8" />
            <stop offset="1" stopColor="#404040" />
          </linearGradient>
        </defs>
      </svg>

      {/* Вертикальная линия — по центру */}
      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 h-[72px] w-[2px]">
        <svg
          width="2"
          height="72"
          viewBox="0 0 2 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <line
            x1="1.25"
            y1="72"
            x2="1.25"
            stroke="url(#paint0_linear_327_1846)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient
              id="paint0_linear_327_1846"
              x1="2.5"
              y1="0"
              x2="2.5"
              y2="72"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="0.35" stopColor="#2E2E2E" />
              <stop offset="0.65" stopColor="#282828" />
              <stop offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Круг аватара (86x86), абсолютно позиционированный сверху слева */}
      <div
        className="absolute rounded-full bg-f1-red text-white text-xl font-bold flex items-center justify-center"
        style={{
          width: 86,
          height: 86,
          top: -43,       // наполовину высоты круга, чтобы центр круга совпадал с верхним краем контейнера
          left: 20,       // отступ слева (можно подкорректировать)
          fontFamily: "SF Pro Display",
          fontWeight: "700",
          fontSize: "24px",
          userSelect: "none",
        }}
      >
        UN
      </div>

      {/* Content (левая и правая части, без аватара) */}
      <div className="absolute top-0 left-5 right-5 bottom-0 flex items-center justify-between pointer-events-none">
        {/* Левая колонка */}
        <div className="flex flex-col justify-center max-w-[calc(50%-12px)] pl-[106px]">
          {/* Отступ слева сделан, чтобы не заходить под аватар */}
          <h2
            className="text-2xl font-bold text-white mb-1 text-[20px]"
            style={{ fontFamily: "SF Pro Display" }}
          >
            username
          </h2>
          <p
            className="text-gray-400 text-[12px]"
            style={{ fontFamily: "SF Pro Display" }}
          >
            ID: 123578765
          </p>
        </div>

        {/* Правая колонка */}
        <div className="flex items-center gap-6 max-w-[calc(50%-12px)]">
          {/* Обмены */}
          <div className="text-center">
            <div
              className="text-3xl font-bold text-white mb-1 text-[24px]"
              style={{ fontFamily: "SF Pro Display" }}
            >
              153K
            </div>
            <div
              className="text-sm text-gray-400 text-[13px]"
              style={{ fontFamily: "SF Pro Display" }}
            >
              Обмены
            </div>
          </div>

          {/* Монеты */}
          <div className="text-center">
            <div
              className="text-3xl font-bold text-white mb-1 text-[24px]"
              style={{ fontFamily: "SF Pro Display" }}
            >
              10K
            </div>
            <div
              className="text-sm text-gray-400 text-[13px]"
              style={{ fontFamily: "SF Pro Display" }}
            >
              Монеты
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
