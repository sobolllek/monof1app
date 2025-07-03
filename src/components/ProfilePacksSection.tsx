
import { Package, Clock, Gift } from 'lucide-react';
import { useDailyPacks } from '../hooks/useDailyPacks';
import PackOpeningAnimation from './PackOpeningAnimation';
import { useState } from 'react';

const ProfilePacksSection = () => {
  const { unclaimedPacks, nextUnclaimedPack, claimPack } = useDailyPacks();
  const [showPackOpening, setShowPackOpening] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'epic': return 'from-purple-500 to-pink-500 border-purple-400 text-purple-200';
      case 'rare': return 'from-blue-500 to-cyan-500 border-blue-400 text-blue-200';
      default: return 'from-gray-500 to-gray-600 border-gray-400 text-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const handleOpenPack = () => {
    if (nextUnclaimedPack) {
      setShowPackOpening(true);
    }
  };

  const handlePackOpened = () => {
    if (nextUnclaimedPack) {
      claimPack(nextUnclaimedPack.id);
    }
    setShowPackOpening(false);
  };

  return (
    <>
      <div className="f1-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Package size={20} />
            Ежедневные паки
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={16} />
            <span>8:00 • 20:00</span>
          </div>
        </div>

        {unclaimedPacks.length === 0 ? (
          <div className="text-center py-6">
            <Package className="mx-auto mb-3 text-gray-400" size={48} />
            <p className="text-gray-400 mb-2">Нет доступных паков</p>
            <p className="text-sm text-gray-500">Следующий пак появится в 8:00 или 20:00</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Следующий пак для открытия */}
            {nextUnclaimedPack && (
              <div className={`p-4 rounded-lg border-2 bg-gradient-to-r ${getCategoryColor(nextUnclaimedPack.category)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{nextUnclaimedPack.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{nextUnclaimedPack.name}</h4>
                    <p className="text-sm opacity-80">
                      {formatDate(nextUnclaimedPack.date)} • {nextUnclaimedPack.type === 'morning' ? 'Утренний' : 'Вечерний'}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-black/20 rounded-full text-xs font-semibold uppercase">
                    {nextUnclaimedPack.category}
                  </span>
                </div>
                <button 
                  onClick={handleOpenPack}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Gift size={16} />
                  Открыть пак
                </button>
              </div>
            )}

            {/* Остальные паки */}
            {unclaimedPacks.length > 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400 mb-2">
                  Еще {unclaimedPacks.length - 1} {unclaimedPacks.length - 1 === 1 ? 'пак' : 'паков'} в очереди:
                </p>
                {unclaimedPacks.slice(1).map((pack) => (
                  <div key={pack.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-2xl">{pack.emoji}</span>
                    <div className="flex-1">
                      <h5 className="font-medium text-white text-sm">{pack.name}</h5>
                      <p className="text-xs text-gray-400">
                        {formatDate(pack.date)} • {pack.type === 'morning' ? 'Утренний' : 'Вечерний'}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                      pack.category === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                      pack.category === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {pack.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <PackOpeningAnimation
        isOpen={showPackOpening}
        onClose={() => setShowPackOpening(false)}
        packType={nextUnclaimedPack?.name || 'Daily Pack'}
        onPackOpened={handlePackOpened}
      />
    </>
  );
};

export default ProfilePacksSection;
