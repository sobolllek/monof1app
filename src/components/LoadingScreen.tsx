
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Показываем лого через 500мс
    const logoTimer = setTimeout(() => setShowLogo(true), 500);

    // Симулируем загрузку
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-f1-gradient-dark flex flex-col items-center justify-center z-50">
      {/* Racing Car Animation */}
      <div className="relative w-full max-w-md mb-8 overflow-hidden">
        <div className="racing-track"></div>
        <div 
          className="racing-car"
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
        >
          🏎️
        </div>
      </div>

      {/* Logo */}
      <div className={`flex items-center gap-3 mb-8 transition-all duration-500 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="w-16 h-16 bg-f1-gradient rounded-full flex items-center justify-center animate-pulse-glow">
          <Zap className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">F1 Card Chase</h1>
          <p className="text-f1-orange">Mania</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-f1-gradient transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="text-gray-400 text-sm">
        Загрузка... {progress}%
      </div>

      {/* Racing Elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 racing-lines opacity-30"></div>
    </div>
  );
};

export default LoadingScreen;
