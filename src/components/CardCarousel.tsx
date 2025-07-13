import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../data/cards';

interface CardCarouselProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const CardCarousel = ({ cards, onCardClick }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  // Блокировка прокрутки страницы
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
    
    // Показываем только 3 карты: центральную и две боковые
    const visible = [];
    const totalVisible = Math.min(3, cards.length);
    
    for (let i = 0; i < totalVisible; i++) {
      const index = (currentIndex + i - Math.floor(totalVisible / 2) + cards.length) % cards.length;
      visible.push({
        card: cards[index],
        position: i - Math.floor(totalVisible / 2),
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

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
    
    // Определяем, это горизонтальный свайп или вертикальный
    const xDiff = Math.abs(e.touches[0].clientX - touchStartX.current);
    const yDiff = Math.abs(e.touches[0].clientY - touchStartY.current);
    
    // Если движение больше по вертикали - отменяем свайп
    if (yDiff > xDiff) {
      isSwiping.current = false;
      return;
    }
    
    // Предотвращаем прокрутку страницы
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    
    const threshold = 50;
    const deltaX = touchEndX.current - touchStartX.current;

    if (deltaX < -threshold) {
      // Swipe left - next card
      handleCardNavigation('right');
    } else if (deltaX > threshold) {
      // Swipe right - previous card
      handleCardNavigation('left');
    }
  };

  // Mouse wheel navigation
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
    <div 
      ref={carouselRef}
      className="relative h-96 flex items-center justify-center w-full touch-none"
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
              {/* Card Image */}
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
              
              {/* Card Content */}
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
      
      {/* Navigation Buttons */}
      <button
        onClick={() => handleCardNavigation('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 
                   bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full 
                   transition-colors backdrop-blur-sm border border-gray-600 touch-none"
      >
        ←
      </button>
      
      <button
        onClick={() => handleCardNavigation('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
                   bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full 
                   transition-colors backdrop-blur-sm border border-gray-600 touch-none"
      >
        →
      </button>
      
      {/* Card Counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 
                      bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-600 touch-none">
        <span className="text-white text-sm">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>
    </div>
  );
};

export default CardCarousel;
