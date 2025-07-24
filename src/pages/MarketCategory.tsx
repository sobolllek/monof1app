import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MarketCarousel from '../components/MarketCarousel';
import MarketModal from '../components/MarketModal';
import { useState, useEffect } from 'react';
import { allItems, MarketItem } from '../data/packs';

const PACK_SVG_MAPPING: Record<number, string> = {
  1: '/svg/base.svg',    // Base Pack (500 coins)
  2: '/svg/gold.svg',    // Gold Pack (1200 coins)
  3: '/svg/gem.svg',     // Gem Pack (2000 coins)
  4: '/svg/limit.svg',   // Limit Pack (3000 stars)
  5: '/svg/prize.svg'    // Prize Pack (2500 stars)
};

const MarketCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPackSvg, setCurrentPackSvg] = useState<string>('/svg/base.svg');
  const { toast } = useToast();

  const items = allItems[categoryId as keyof typeof allItems] || [];

  useEffect(() => {
    if (items.length > 0) {
      updateSvgForItem(items[0]);
    }
  }, [items]);

  const updateSvgForItem = (item: MarketItem) => {
    const svgPath = PACK_SVG_MAPPING[item.id] || '/svg/base.svg';
    setCurrentPackSvg(svgPath);
  };

  const handleItemClick = (item: MarketItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleItemChange = (item: MarketItem) => {
    updateSvgForItem(item);
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
  {/* Фоновые элементы (самые нижние) */}
  {items.length > 0 && (
    <>
      <div className="absolute bottom-0 left-0 w-full h-[400px] z-0">
        <img src="/svg/collectionsvg2.svg" alt="" className="w-full h-full object-cover object-bottom opacity-60" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[400px] z-0">
        <img src="/svg/collectionsvg1.svg" alt="" className="w-full h-full object-cover object-top opacity-60" />
      </div>
    </>
  )}

  {/* Pack SVG (под каруселью, но над фоном) */}
  <div className="absolute bottom-[69%] left-0 right-0 z-10 flex justify-center">
    <div className="h-[65px]">
      <img src="/svg/pack.svg" alt="Pack" className="h-full object-contain" />
    </div>
  </div>

  {/* Header с основным SVG пака */}
  <header className="fixed top-0 left-0 right-0 z-40 mt-8">
    <div className="p-4 pt-[3.75rem]">
      <div className="flex flex-col items-center justify-center">
        <div className="h-[70px] flex items-center justify-center">
          <img src={currentPackSvg} alt="Pack" className="h-full object-contain" />
        </div>
      </div>
    </div>
  </header>

  {/* Карусель карт (самый верхний элемент) */}
  <div className="absolute inset-0 flex items-center justify-center px-4 z-20 pt-16">
    <MarketCarousel 
      items={items}
      onItemClick={handleItemClick}
      onItemChange={handleItemChange}
    />
  </div>

  {/* Модальное окно */}
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
