import { useState } from 'react';
import { Coins, Star } from 'lucide-react';
import { MarketItem } from '../data/packs';

interface MarketCoinPurchaseProps {
  item: MarketItem;
  onPurchase: (quantity: number) => void;
}

const MarketCoinPurchase = ({ item, onPurchase }: MarketCoinPurchaseProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handlePurchase = () => {
    onPurchase(quantity);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Центральная монета */}
      <div 
        className="w-64 h-80 rounded-2xl border-4 border-gray-400 bg-black flex flex-col items-center justify-center cursor-pointer"
        onClick={handleIncrement}
      >
        <div className="text-8xl mb-4">🪙</div>
        <p className="text-white text-xl">{item.name}</p>
      </div>

      {/* Счетчик количества */}
      <div className="flex items-center justify-center gap-4 my-6">
        <button 
          className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="text-white text-2xl font-bold">{quantity}</span>
        <button 
          className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>

      {/* Кнопка покупки */}
      <button 
        className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2"
        onClick={handlePurchase}
      >
        {item.currency === 'coins' ? <Coins className="text-yellow-400" /> : <Star className="text-purple-400" />}
        Купить за {item.price * quantity} {item.currency}
      </button>
    </div>
  );
};

export default MarketCoinPurchase;