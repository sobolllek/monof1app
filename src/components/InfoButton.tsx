import { Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface InfoButtonProps {
  title: string;
  description: string;
  autoCloseDelay?: number;
  fadeDuration?: number;
}

const InfoButton = ({ 
  title, 
  description, 
  autoCloseDelay = 5000,
  fadeDuration = 500
}: InfoButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showPanel = () => {
    // Сброс предыдущих анимаций
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Показываем панель
    setIsVisible(true);
    setIsClosing(false);
    
    // Устанавливаем таймер на закрытие
    timeoutRef.current = setTimeout(() => {
      startClosing();
    }, autoCloseDelay);
  };

  const startClosing = () => {
    setIsClosing(true);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, fadeDuration);
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    startClosing();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={showPanel}
        className="p-2 rounded-lg focus:outline-none hover:bg-transparent active:bg-transparent"
      >
        <Info size={20} className="text-gray-400" />
      </button>
      
      {(isVisible || isClosing) && (
        <div 
          className={`absolute right-0 top-12 w-72 bg-gray-900/95 border border-gray-700/50 rounded-xl p-4 z-50 backdrop-blur-lg shadow-2xl transition-opacity duration-${fadeDuration} ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onMouseLeave={() => autoCloseDelay > 0 && startClosing()}
        >
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            ×
          </button>
          <h3 className="text-white font-semibold mb-2 pr-4">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
