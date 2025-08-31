import React, { useRef, useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textRect, setTextRect] = useState<{ width: number; left: number; top: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(0);
  const [showEffects, setShowEffects] = useState(false); // Новое состояние для контроля эффектов

  useEffect(() => {
    const text = textRef.current;
    const container = containerRef.current;

    if (text && container) {
      const rect = text.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const offsetLeft = rect.left - containerRect.left;
      const offsetTop = rect.top - containerRect.top;

      setTextRect({
        width: rect.width,
        left: offsetLeft,
        top: offsetTop,
      });

      // Запускаем эффекты после измерения позиции текста
      setShowEffects(true);
    }
  }, []);

  // Плавное увеличение интенсивности света
  useEffect(() => {
    if (!showEffects) return;

    const interval = setInterval(() => {
      setLightIntensity(prev => {
        if (prev >= 0.5) {
          clearInterval(interval);
          return 0.5;
        }
        return prev + 0.005; // Более плавное увеличение
      });
    }, 30);

    return () => clearInterval(interval);
  }, [showEffects]);

  // Прогресс загрузки
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Блёстки (запускаются только когда showEffects = true)
  useEffect(() => {
    if (!showEffects || !textRef.current || !containerRef.current || !textRect) return;

    const createParticle = () => {
      const opacity = 0;
      const particle = document.createElement('span');
      particle.className = 'particle';

      const randomX = textRect.left + Math.random() * textRect.width;
      const centerY = textRect.top + textRef.current!.offsetHeight / 2;

      const randomXOffset = (Math.random() - 0.5) * 150;
      const randomRotation = Math.random() * 60 - 30;

      particle.style.left = `${randomX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.opacity = `${opacity}`;
      particle.style.setProperty('--particle-opacity', `${Math.random() * 0.6 + 0.2}`);
      particle.style.animationDelay = `${Math.random() * 1.5}s`;
      particle.style.animationDuration = `${4 + Math.random() * 3}s`;
      particle.style.setProperty('--random-x-offset', `${randomXOffset}px`);
      particle.style.setProperty('--random-rotation', `${randomRotation}deg`);

      containerRef.current!.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    };

    const interval = setInterval(createParticle, 80);
    return () => clearInterval(interval);
  }, [textRect, showEffects]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Подсветка с очень плавным появлением */}
      {textRect && (
        <div
          className="absolute pointer-events-none blur-2xl transition-opacity duration-2000 ease-in" // Увеличенная длительность
          style={{
            top: '-100px',
            left: `${textRect.left - 50}px`,
            width: `${textRect.width + 100}px`,
            height: '100vh',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
            opacity: lightIntensity,
            transitionProperty: 'opacity',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}

      {/* Текст с плавным переходом от черного к металлическому эффекту */}
      <h1
        ref={textRef}
        className="text-5xl font-bold relative z-10 pointer-events-none"
        style={{
          color: lightIntensity > 0 ? 'transparent' : '#000',
          transition: 'color 1.5s ease-out'
        }}
      >
        <span className={lightIntensity > 0 ? 'metal-shine-text' : ''}>
          Mono F1
        </span>
      </h1>

      {/* Прогресс-бар */}
      <div className="mt-10 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-2 text-gray-400 text-sm">
        Загрузка... {progress}%
      </div>
    </div>
  );
};

export default LoadingScreen;