import { useState, useEffect, useRef, useCallback } from 'react';
import { Coins, Star } from 'lucide-react';
import { MarketItem } from '../data/packs';

interface MarketCarouselProps {
  items: MarketItem[];
  onItemClick: (item: MarketItem) => void;
  onItemChange?: (item: MarketItem) => void;
}

const MarketCarousel = ({ items, onItemClick, onItemChange }: MarketCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const getCenterItem = useCallback(() => {
    return items[currentIndex];
  }, [items, currentIndex]);

  useEffect(() => {
    if (onItemChange && items.length > 0) {
      onItemChange(getCenterItem());
    }
  }, [currentIndex, items, onItemChange, getCenterItem]);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isSwiping.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400';
      case 'epic': return 'border-purple-400';
      case 'rare': return 'border-blue-400';
      default: return 'border-gray-400';
    }
  };

  const getCurrencyIcon = (currency: string) => {
    return currency === 'coins' ? 
      <Coins className="text-yellow-400" size={16} /> : 
      <Star className="text-purple-400" size={16} />;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    const rect = carouselRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x: deltaX * 20, y: deltaY * 20 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const getVisibleItems = useCallback(() => {
    if (items.length === 0) return [];
    
    const visible = [];
    const totalVisible = Math.min(3, items.length);
    
    for (let i = 0; i < totalVisible; i++) {
      const index = (currentIndex + i - 1 + items.length) % items.length;
      visible.push({
        item: items[index],
        position: i - 1,
        index
      });
    }
    
    return visible;
  }, [items, currentIndex]);

  const handleItemNavigation = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  }, [items.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
    
    const xDiff = Math.abs(e.touches[0].clientX - touchStartX.current);
    const yDiff = Math.abs(e.touches[0].clientY - touchStartY.current);
    
    if (yDiff > xDiff) {
      isSwiping.current = false;
      return;
    }
    
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    
    const threshold = 50;
    const deltaX = touchEndX.current - touchStartX.current;

    if (deltaX < -threshold) {
      handleItemNavigation('right');
    } else if (deltaX > threshold) {
      handleItemNavigation('left');
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) {
        handleItemNavigation('right');
      } else {
        handleItemNavigation('left');
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleItemNavigation('left');
      if (e.key === 'ArrowRight') handleItemNavigation('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleItemNavigation]);

  const visibleItems = getVisibleItems();

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400 text-lg">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Название и цена текущего товара */}
      <div className="text-center mb-4 h-16">
        <p className="text-white text-lg font-medium">
          {getCenterItem()?.name || ''}
        </p>
        {getCenterItem()?.price && (
          <div className="flex items-center justify-center gap-2 mt-1">
            {getCenterItem()?.currency && getCurrencyIcon(getCenterItem().currency)}
            <span className="text-white font-medium">
              {getCenterItem()?.price} {getCenterItem()?.currency}
            </span>
          </div>
        )}
      </div>
      
      <div 
        ref={carouselRef}
        className="relative h-96 flex items-center justify-center touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {visibleItems.map(({ item, position, index }) => {
          const isCenter = position === 0;
          const scale = isCenter ? 1 : 0.85;
          const translateX = position * 180;
          const rotateY = position * 15;
          const zIndex = isCenter ? 20 : 10 - Math.abs(position);

          return (
            <div
              key={`${item.id}-${index}`}
              className={`absolute transition-all duration-500 cursor-pointer ${
                isCenter ? 'hover:scale-105' : 'hover:scale-95'
              } touch-none`}
              style={{
                transform: `
                  translateX(${translateX + (isCenter ? mousePosition.x : 0)}px) 
                  translateY(${isCenter ? mousePosition.y : 0}px)
                  scale(${scale}) 
                  rotateY(${rotateY}deg)
                  perspective(1000px)
                `,
                zIndex,
              }}
              onClick={() => {
                if (isCenter) {
                  onItemClick(item);
                } else {
                  setCurrentIndex(index);
                }
              }}
              onMouseMove={isCenter ? handleMouseMove : undefined}
              onMouseLeave={isCenter ? handleMouseLeave : undefined}
            >
              <div className={`w-64 h-80 rounded-2xl border-4 ${getRarityBorder(item.rarity)} bg-black overflow-hidden relative touch-none`}>
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center text-8xl">
                    {item.image}
                  </div>
                  {item.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-white text-sm line-clamp-2">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketCarousel;