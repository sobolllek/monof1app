import { useParams, useNavigate } from 'react-router-dom';
import MarketCarousel from '../components/MarketCarousel';
import MarketModal from '../components/MarketModal';
import { useState, useEffect } from 'react';
import { allItems, MarketItem } from '../data/packs';
import { Coins, Star } from 'lucide-react';

const PACK_SVG_MAPPING: Record<number, string> = {
  1: '/svg/base.svg',
  2: '/svg/gold.svg',
  3: '/svg/gem.svg',
  4: '/svg/limit.svg',
  5: '/svg/prize.svg'
};

const MarketCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPackSvg, setCurrentPackSvg] = useState<string>('/svg/base.svg');
  const [currencyType, setCurrencyType] = useState<'coins' | 'stars'>('coins');
  const [packCount, setPackCount] = useState(1);

  const items = allItems[categoryId as keyof typeof allItems] || [];

  useEffect(() => {
    if (items.length > 0) {
      updateSvgForItem(items[0]);
      setSelectedItem(items[0]);

      const defaultCurrency = items[0].availableCurrencies.includes(currencyType)
        ? currencyType
        : items[0].availableCurrencies[0];
      setCurrencyType(defaultCurrency);
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
    setSelectedItem(item);
    setPackCount(1);

    const defaultCurrency = item.availableCurrencies.includes(currencyType)
      ? currencyType
      : item.availableCurrencies[0];
    setCurrencyType(defaultCurrency);
  };

  const handlePackClick = () => {
    setPackCount(prev => prev + 1);
  };

  const handleConfirmBuy = (itemId: number, totalPrice: number, currency: 'coins' | 'stars') => {
    if (categoryId === 'buyPacks' && selectedItem) {
      navigate(`/pack-opening/${selectedItem.name}`);
    }
    setPackCount(1);
  };

  const getUnitPrice = (item: MarketItem | null, currency: 'coins' | 'stars') => {
    if (!item) return 0;
    return currency === 'coins' ? item.coinPrice : item.starPrice ?? 0;
  };

  const getTotalPrice = (item: MarketItem | null, currency: 'coins' | 'stars', count: number) => {
    return getUnitPrice(item, currency) * count;
  };

  const formatPrice = (value: number) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1).replace('.0', '')}K` : value.toString();
  };

  return (
    <div className="min-h-screen bg-black pb-20 relative overflow-hidden">
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

      <div className="absolute bottom-[68%] left-0 right-0 z-10 flex justify-center">
        <div className="h-[65px]">
          <img src="/svg/pack.svg" alt="Pack" className="h-full object-contain" />
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 mt-10">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex flex-col items-center justify-center">
            <div className="h-[70px] flex items-center justify-center">
              <img
                src={currentPackSvg}
                alt="Pack"
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="absolute inset-0 flex items-center justify-center px-4 z-20 pt-12">
        <MarketCarousel
          items={items}
          onItemClick={handleItemClick}
          onItemChange={handleItemChange}
          onPackClick={handlePackClick}
          hidePrices
        />
      </div>

      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 w-max mx-auto">
        <div className="relative">
          <img
            src="/svg/contsvg.svg"
            alt="Panel background"
            className="h-[76px] object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-between gap-4 px-6">
            <div className="relative w-[66px] h-[35px] bg-white rounded-full flex items-center justify-between px-1">
              <div
                className={`absolute left-[2px] top-1/2 -translate-y-1/2 w-[31px] h-[31px] rounded-full transition-transform duration-300 bg-[#7AB82E]
                  ${currencyType === 'stars' ? 'translate-x-[31px]' : 'translate-x-0'}`}
              />
              <button
                onClick={() => setCurrencyType('coins')}
                className="relative z-10 w-[31px] h-[31px] flex items-center justify-center"
                disabled={!selectedItem?.availableCurrencies.includes('coins')}
              >
                <Coins
                  size={15}
                  className={`transition-colors duration-300 ${currencyType === 'coins' ? 'text-white' : 'text-gray-400'} -translate-x-[1px]`}
                />
              </button>
              <button
                onClick={() => setCurrencyType('stars')}
                className="relative z-10 w-[31px] h-[31px] flex items-center justify-center"
                disabled={!selectedItem?.availableCurrencies.includes('stars')}
              >
                <Star
                  size={15}
                  className={`transition-colors duration-400 ${currencyType === 'stars' ? 'text-white' : 'text-gray-400'} translate-x-[1px]`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between w-[190px] h-[35px] bg-[#0D0D0D] rounded-full pl-4 pr-[4px]">
              <span className="text-white font-semibold text-[12px] whitespace-nowrap">{packCount} пак{packCount > 1 ? 'ов' : ''}</span>
              <div className="w-[63px] h-[31px] bg-black rounded-full flex items-center justify-center -mr-[2px]">
                <span className="text-white font-semibold text-[16px] leading-none">
                  {formatPrice(getTotalPrice(selectedItem, currencyType, packCount))}
                </span>
              </div>
            </div>

            <button
              className="flex items-center justify-center"
              onClick={() => setShowModal(true)}
              disabled={!selectedItem?.availableCurrencies.includes(currencyType)}
            >
              <img src="/svg/ok.svg" alt="Купить" className="w-[58px] h-[35px]" />
            </button>
          </div>
        </div>
      </div>

      <MarketModal
        item={selectedItem}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBuy={(id, price, currency) => {
          handleConfirmBuy(id, price * packCount, currency);
        }}
      />
    </div>
  );
};

export default MarketCategory;
