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
  fadeDuration = 700
}: InfoButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showPanel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setIsVisible(true);
    setIsClosing(false);
    
    timeoutRef.current = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => setIsVisible(false), fadeDuration);
    }, autoCloseDelay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={showPanel}
        className="p-2 rounded-lg transition-colors"
      >
        <Info size={20} className="text-gray-400" />
      </button>
      
      {(isVisible || isClosing) && (
        <div 
          className={`absolute right-0 top-12 w-72 bg-gray-900/95 border border-gray-700/50 rounded-xl p-4 z-50 shadow-lg transition-opacity duration-${fadeDuration} ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h3 className="text-white font-semibold mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
