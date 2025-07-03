
import { Info } from 'lucide-react';
import { useState } from 'react';

interface InfoButtonProps {
  title: string;
  description: string;
}

const InfoButton = ({ title, description }: InfoButtonProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="info-button-animate p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <Info size={20} className="text-gray-400 hover:text-white" />
      </button>
      
      {showInfo && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowInfo(false)}
          />
          <div className="info-panel-enter absolute right-0 top-12 w-72 bg-gray-900/95 border border-gray-700/50 rounded-xl p-4 z-50 backdrop-blur-lg shadow-2xl transition-all duration-300 ease-out">
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm">{description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoButton;
