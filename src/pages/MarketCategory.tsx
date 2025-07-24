import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MarketCarousel from '../components/MarketCarousel';
import MarketModal from '../components/MarketModal';
import { useState } from 'react';
import { allItems, categoryNames, MarketItem } from '../data/packs';
import MarketCoinPurchase from '../components/MarketCoinPurchase';

const MarketCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [coinQuantity, setCoinQuantity] = useState(1);
  const { toast } = useToast();

  const items = allItems[categoryId as keyof typeof allItems] || [];
  const isCoinPurchase = categoryId === 'buyCoins';

  const handleItemClick = (item: MarketItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleBuy = (itemId: number, price: number) => {
    toast({
      title: "Покупка успешна!",
      description: `Вы приобрели ${selectedItem?.name} за ${price} ${selectedItem?.currency}.`,
    });
    setShowModal(false);
    
    if (categoryId === 'buyPacks' && selectedItem) {
      navigate(`/pack-opening/${selectedItem.name}`);
    }
  };

  const handleCoinPurchase = (quantity: number) => {
    if (items.length === 0) return;
    
    const coinItem = items[0];
    toast({
      title: "Покупка успешна!",
      description: `Вы приобрели ${quantity} x ${coinItem.name} за ${coinItem.price * quantity} ${coinItem.currency}.`,
    });
  };

  const increaseQuantity = () => {
    setCoinQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (coinQuantity > 1) {
      setCoinQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20 relative overflow-hidden">
      {items.length > 0 && (
        <>
          <div className="absolute bottom-0 left-0 w-full h-[400px] z-0 pointer-events-none">
            <img 
              src="/svg/collectionsvg2.svg" 
              alt=""
              className="w-full h-full object-cover object-bottom opacity-60"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
            <img 
              src="/svg/collectionsvg1.svg" 
              alt=""
              className="w-full h-full object-cover object-top opacity-60"
            />
          </div>
        </>
      )}
  
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">
              {categoryNames[categoryId as keyof typeof categoryNames] || 'Магазин'}
            </h1>
          </div>
        </div>
      </header>
  
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10 pt-16">
        {isCoinPurchase ? (
          <div className="flex flex-col items-center">
            {/* Центральная монета */}
            <div 
              className="w-64 h-64 rounded-2xl border-4 border-yellow-400 bg-black flex flex-col items-center justify-center mb-8 cursor-pointer"
              onClick={increaseQuantity}
            >
              <div className="text-8xl">🪙</div>
              <p className="text-white text-xl mt-4">{items[0]?.name}</p>
            </div>

            {/* Счетчик количества */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button 
                className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="text-white text-2xl font-bold">{coinQuantity}</span>
              <button 
                className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            {/* Кнопка покупки */}
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-lg"
              onClick={() => handleCoinPurchase(coinQuantity)}
            >
              Купить за {items[0]?.price * coinQuantity} {items[0]?.currency}
            </button>
          </div>
        ) : (
          <MarketCarousel 
            items={items}
            onItemClick={handleItemClick}
          />
        )}
      </div>
  
      {!isCoinPurchase && (
        <MarketModal
          item={selectedItem}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onBuy={handleBuy}
        />
      )}
    </div>
  );
};

export default MarketCategory;