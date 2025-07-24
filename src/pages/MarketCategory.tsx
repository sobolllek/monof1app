import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MarketCarousel from '../components/MarketCarousel';
import MarketModal from '../components/MarketModal';
import { useState, useEffect } from 'react';
import { allItems, MarketItem } from '../data/packs';

const MarketCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPackType, setCurrentPackType] = useState<string>('PACK');
  const { toast } = useToast();

  const items = allItems[categoryId as keyof typeof allItems] || [];

  useEffect(() => {
    // Устанавливаем тип первого пака при загрузке
    if (items.length > 0 && items[0].packType) {
      setCurrentPackType(items[0].packType.toUpperCase());
    }
  }, [items]);

  const handleItemClick = (item: MarketItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleItemChange = (item: MarketItem) => {
    if (item.packType) {
      setCurrentPackType(item.packType.toUpperCase());
    }
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
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[90px] text-white font-formula1 font-black tracking-tight">
              {currentPackType}
            </h1>
            <p className="text-[75px] text-white font-sf-pro-thin-italic mt-[-55px] relative z-0">(pack)</p>
          </div>
        </div>
      </header>

      <div className="absolute inset-0 flex items-center justify-center px-4 z-10 pt-16">
        <MarketCarousel 
          items={items}
          onItemClick={handleItemClick}
          onItemChange={handleItemChange}
        />
      </div>
  
      <MarketModal
        item={selectedItem}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBuy={handleBuy}
      />
    </div>
  );
};

export default MarketCategory;
