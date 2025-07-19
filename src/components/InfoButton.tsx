import { Info } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InfoButtonProps {
  title: string;
  description: string;
  autoCloseDelay?: number; 
  fadeDuration?: number;    
}

const InfoButton = ({ 
  title, 
  description, 
  autoCloseDelay = 2000,
  fadeDuration = 5000 
}: InfoButtonProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let autoCloseTimer: NodeJS.Timeout;
    let fadeOutTimer: NodeJS.Timeout;

    if (showInfo && !isClosing) {
      autoCloseTimer = setTimeout(() => {
        setIsClosing(true);
        fadeOutTimer = setTimeout(() => setShowInfo(false), fadeDuration);
      }, autoCloseDelay);
    }

    return () => {
      clearTimeout(autoCloseTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [showInfo, isClosing, autoCloseDelay, fadeDuration]);

  const handleToggle = () => {
    if (showInfo) {
      setIsClosing(true);
      setTimeout(() => setShowInfo(false), fadeDuration);
    } else {
      setShowInfo(true);
      setIsClosing(false);
    }
  };

  const handleOverlayClick = () => {
    setIsClosing(true);
    setTimeout(() => setShowInfo(false), fadeDuration);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="p-2 rounded-lg transition-colors focus:outline-none hover:bg-transparent active:bg-transparent"
      >
        <Info size={20} className="text-gray-400" />
      </button>
      
      {(showInfo || isClosing) && (
        <>
          {/* Оверлей (фон) */}
          <div 
            className={`fixed inset-0 z-40 transition-opacity duration-[${fadeDuration}ms] ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleOverlayClick}
          />
          
          {/* Информационная панель */}
          <div 
            className={`absolute right-0 top-12 w-72 bg-gray-900/95 border border-gray-700/50 rounded-xl p-4 z-50 backdrop-blur-lg shadow-2xl transition-opacity duration-[${fadeDuration}ms] ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
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
