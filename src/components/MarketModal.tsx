import { useState } from 'react';
import { X, Gift, Coins, Star, Package } from 'lucide-react';

interface MarketItem {
  id: number;
  name: string;
  price: number;
  currency: 'coins' | 'stars';
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface MarketModalProps {
  item: MarketItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (itemId: number, price: number) => void;
}

const MarketModal = ({ item, isOpen, onClose, onBuy }: MarketModalProps) => {
  const [action, setAction] = useState<'view' | 'buy' | 'gift'>('view');
  const [giftPlayerName, setGiftPlayerName] = useState('');

  if (!isOpen || !item) return null;

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-400';
      case 'epic': return 'from-purple-400 to-pink-500 border-purple-400';
      case 'rare': return 'from-blue-400 to-cyan-500 border-blue-400';
      default: return 'from-gray-400 to-gray-500 border-gray-400';
    }
  };

  const handleBuy = () => {
    onBuy(item.id, item.price);
    onClose();
  };

  const handleGift = () => {
    if (giftPlayerName.trim()) {
      // Логика дарения
      onClose();
    }
  };

  const resetToView = () => {
    setAction('view');
    setGiftPlayerName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
        <button
          onClick={() => {
            resetToView();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 transition-colors"
        >
          <X size={24} />
        </button>

        {action === 'view' && (
          <div className="p-6">
            <div className={`w-full h-80 bg-gradient-to-r ${getRarityColors(item.rarity)} rounded-xl border-2 p-6 mb-6 flex flex-col justify-between items-center`}>
              <div className="text-8xl mb-4">{item.image}</div>
              <div className="text-center">
                <h3 className="font-bold text-white text-xl mb-2">{item.name}</h3>
                <p className="text-white/80 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-center gap-2">
                  {item.currency === 'coins' ? (
                    <Coins className="text-yellow-400" />
                  ) : (
                    <Star className="text-purple-400" />
                  )}
                  <span className="text-white font-bold text-lg">
                    {item.price} {item.currency}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setAction('buy')}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Package size={20} />
                Купить сейчас
              </button>
              
              <button
                onClick={() => setAction('gift')}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Gift size={20} />
                Купить в подарок
              </button>
            </div>
          </div>
        )}

        {action === 'buy' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Подтверждение покупки</h3>
            <div className="mb-6">
              <p className="text-gray-300 mb-4">Вы уверены, что хотите купить:</p>
              <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
                <div className="text-4xl">{item.image}</div>
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {item.currency === 'coins' ? (
                      <Coins size={16} className="text-yellow-400" />
                    ) : (
                      <Star size={16} className="text-purple-400" />
                    )}
                    <span className="text-white">{item.price} {item.currency}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={resetToView}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
              >
                Подтвердить
              </button>
            </div>
          </div>
        )}

        {action === 'gift' && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Подарок для друга</h3>
            <div className="mb-6">
              <p className="text-gray-300 mb-4">Введите имя игрока, которому хотите подарить:</p>
              <input
                type="text"
                value={giftPlayerName}
                onChange={(e) => setGiftPlayerName(e.target.value)}
                placeholder="Имя игрока"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-f1-red"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={resetToView}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleGift}
                disabled={!giftPlayerName.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
              >
                Купить в подарок
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketModal;