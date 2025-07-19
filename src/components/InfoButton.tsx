import { Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface InfoButtonProps {
  title: string;
  description: string;
  autoCloseDelay?: number;
}

const InfoButton = ({ 
  title, 
  description, 
  autoCloseDelay = 5000 
}: InfoButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showPanel = () => {
    // Сбрасываем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Показываем панель
    setIsVisible(true);
    
    // Устанавливаем таймер на автоматическое закрытие
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDelay);
  };

  const hidePanel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    // Очистка таймера при размонтировании
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
      
      {isVisible && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={hidePanel}
          />
          
          <div 
            className="absolute right-0 top-12 w-72 bg-gray-900/95 border border-gray-700/50 rounded-xl p-4 z-50 backdrop-blur-lg shadow-2xl animate-fadeIn"
          >
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm">{description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoButton;
