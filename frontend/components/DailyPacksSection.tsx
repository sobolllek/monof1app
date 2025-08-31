
import { Package, Gift } from 'lucide-react';
import { useDailyPacks } from '../hooks/useDailyPacks';
import PackOpeningAnimation from './PackOpeningAnimation';
import { useState } from 'react';

const DailyPacksSection = () => {
  const { availablePack, claimPack } = useDailyPacks();
  const [showPackOpening, setShowPackOpening] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'epic': return 'from-purple-500 to-pink-500 border-purple-400';
      case 'rare': return 'from-blue-500 to-cyan-500 border-blue-400';
      default: return 'from-gray-500 to-gray-600 border-gray-400';
    }
  };

  const handleOpenPack = () => {
    if (availablePack) {
      setShowPackOpening(true);
    }
  };

  const handlePackOpened = () => {
    if (availablePack) {
      claimPack(availablePack.id);
    }
    setShowPackOpening(false);
  };

  if (!availablePack) {
    return (
      <div className="f1-card p-4 text-center opacity-75">
        <Package className="mx-auto mb-2 text-gray-400" size={32} />
        <h3 className="font-semibold text-gray-300 mb-1">Нет доступных паков</h3>
        <p className="text-sm text-gray-400">Следующий пак в 8:00 или 20:00</p>
      </div>
    );
  }

  return (
    <>
      <div className="f1-card p-6 bg-gradient-to-r from-f1-red/20 to-f1-orange/20 border-f1-red/30">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${getCategoryColor(availablePack.category)} rounded-xl flex items-center justify-center text-2xl border-2`}>
            {availablePack.emoji}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">
              {availablePack.name}
            </h3>
            <p className="text-gray-300 text-sm">
              Ежедневный пак доступен
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                availablePack.category === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                availablePack.category === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {availablePack.category}
              </span>
              <span className="text-xs text-gray-400">
                {availablePack.type === 'morning' ? 'Утренний' : 'Вечерний'}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleOpenPack}
          className="w-full f1-button flex items-center justify-center gap-2"
        >
          <Gift size={20} />
          Получить пак
        </button>
      </div>

      <PackOpeningAnimation
        isOpen={showPackOpening}
        onClose={() => setShowPackOpening(false)}
        packType={availablePack.name}
        onPackOpened={handlePackOpened}
      />
    </>
  );
};

export default DailyPacksSection;
