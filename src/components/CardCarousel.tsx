import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../data/cards';

interface CardCarouselProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  onCardChange?: (card: Card) => void;
}

const CardCarousel = ({ cards, onCardClick, onCardChange }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const getCenterCard = useCallback(() => {
    return cards[currentIndex];
  }, [cards, currentIndex]);

  useEffect(() => {
    if (onCardChange && cards.length > 0) {
      onCardChange(getCenterCard());
    }
  }, [currentIndex, cards, onCardChange, getCenterCard]);

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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500 via-yellow-400 to-yellow-600';
      case 'epic': return 'from-purple-500 via-purple-400 to-purple-600';
      case 'rare': return 'from-blue-500 via-blue-400 to-blue-600';
      default: return 'from-gray-500 via-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 shadow-yellow-400/30';
      case 'epic': return 'border-purple-400 shadow-purple-400/30';
      case 'rare': return 'border-blue-400 shadow-blue-400/30';
      default: return 'border-gray-400 shadow-gray-400/30';
    }
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

  const getVisibleCards = useCallback(() => {
    if (cards.length === 0) return [];
    
    const visible = [];
    const totalVisible = Math.min(3, cards.length);
    
    for (let i = 0; i < totalVisible; i++) {
      const index = (currentIndex + i - 1 + cards.length) % cards.length;
      visible.push({
        card: cards[index],
        position: i - 1,
        index
      });
    }
    
    return visible;
  }, [cards, currentIndex]);

  const handleCardNavigation = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  }, [cards.length]);

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
      handleCardNavigation('right');
    } else if (deltaX > threshold) {
      handleCardNavigation('left');
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) {
        handleCardNavigation('right');
      } else {
        handleCardNavigation('left');
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleCardNavigation('left');
      if (e.key === 'ArrowRight') handleCardNavigation('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleCardNavigation]);

  const visibleCards = getVisibleCards();

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400 text-lg">Карты не найдены</p>
      </div>
    );
  }

  return (
    <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Название текущей карты (единственное место) */}
      <div className="text-center mb-4 h-6">
        <p className="text-white text-lg font-medium truncate max-w-xs mx-auto">
          {getCenterCard()?.name || ''}
        </p>
      </div>
      
      <div 
        ref={carouselRef}
        className="relative h-96 flex items-center justify-center touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {visibleCards.map(({ card, position, index }) => {
          const isCenter = position === 0;
          const scale = isCenter ? 1 : 0.85;
          const translateX = position * 180;
          const rotateY = position * 15;
          const zIndex = isCenter ? 20 : 10 - Math.abs(position);

          return (
            <div
              key={`${card.id}-${index}`}
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
                filter: isCenter ? 'none' : 'blur(4px)',
              }}
              onClick={() => {
                if (isCenter) {
                  onCardClick(card);
                } else {
                  setCurrentIndex(index);
                }
              }}
              onMouseMove={isCenter ? handleMouseMove : undefined}
              onMouseLeave={isCenter ? handleMouseLeave : undefined}
            >
              <div
                className={`w-64 h-80 rounded-2xl border-4 ${getRarityBorder(card.rarity)} 
                          bg-gradient-to-br ${getRarityColor(card.rarity)} 
                          shadow-2xl ${isCenter ? 'shadow-xl' : 'shadow-lg'} 
                          overflow-hidden relative touch-none`}
              >
                {card.image ? (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden touch-none">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-full object-cover touch-none"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-800 items-center justify-center text-4xl hidden touch-none">
                      {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-4xl touch-none">
                    {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                  </div>
                )}
                
                <div className="p-4 bg-gray-900/90 h-32 touch-none">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">{card.name}</h3>
                  {card.team && (
                    <p className="text-gray-300 text-sm mb-1 truncate">{card.team}</p>
                  )}
                  {card.location && (
                    <p className="text-gray-300 text-sm mb-1 truncate">{card.location}</p>
                  )}
                  <div className="flex justify-between items-center mt-2 touch-none">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase
                      ${card.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                        card.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                        card.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'}`}>
                      {card.rarity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardCarousel;
