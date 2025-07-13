import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../data/cards';

interface CardCarouselProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const CardCarousel = ({ cards, onCardClick }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [swipeOffset, setSwipeOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);
  const animationRef = useRef<number>();

  // Блокировка прокрутки страницы
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isSwiping.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
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

  const getVisibleCards = useCallback(() => {
    if (cards.length === 0) return [];
    
    return [
      { card: cards[(currentIndex - 1 + cards.length) % cards.length], position: -1 },
      { card: cards[currentIndex], position: 0 },
      { card: cards[(currentIndex + 1) % cards.length], position: 1 }
    ];
  }, [cards, currentIndex]);

  const animateSwipe = (targetOffset: number, callback?: () => void) => {
    const startTime = performance.now();
    const duration = 300;
    const startOffset = swipeOffset;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 3); // Кубическое замедление

      setSwipeOffset(startOffset + (targetOffset - startOffset) * easing);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (callback) {
        callback();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleCardNavigation = useCallback((direction: 'left' | 'right') => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const targetIndex = direction === 'left' 
      ? (currentIndex - 1 + cards.length) % cards.length
      : (currentIndex + 1) % cards.length;

    // Анимация свайпа
    const swipeDirection = direction === 'left' ? -1 : 1;
    animateSwipe(swipeDirection * 200, () => {
      setCurrentIndex(targetIndex);
      setSwipeOffset(0);
    });
  }, [cards.length, currentIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    
    const xDiff = Math.abs(e.touches[0].clientX - touchStartX.current);
    const yDiff = Math.abs(e.touches[0].clientY - touchStartY.current);
    
    if (yDiff > xDiff) {
      isSwiping.current = false;
      return;
    }
    
    setSwipeOffset(e.touches[0].clientX - touchStartX.current);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    
    const threshold = 50;
    if (swipeOffset < -threshold) {
      handleCardNavigation('right');
    } else if (swipeOffset > threshold) {
      handleCardNavigation('left');
    } else {
      animateSwipe(0);
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {visibleCards.map(({ card, position }) => {
        const isCenter = position === 0;
        const scale = isCenter ? 1 : 0.85;
        const baseTranslateX = position * 120 + (isCenter ? swipeOffset : swipeOffset * 0.5);
        const zIndex = isCenter ? 20 : 10 - Math.abs(position);
        const opacity = isCenter ? 1 : 0.8;
        const rotateY = position * 15 + (isCenter ? swipeOffset * 0.1 : 0);

        return (
          <div
            key={`${card.id}-${position}`}
            className={`absolute transition-all duration-300 ease-out ${
              isCenter ? 'cursor-pointer hover:scale-105' : 'filter blur-sm hover:blur-none'
            } touch-none`}
            style={{
              transform: `
                translateX(${baseTranslateX}px)
                translateY(${isCenter ? mousePosition.y : 0}px)
                scale(${scale})
                rotateY(${rotateY}deg)
                perspective(1000px)
              `,
              zIndex,
              opacity,
            }}
            onClick={() => isCenter ? onCardClick(card) : setCurrentIndex(
              (currentIndex + position + cards.length) % cards.length
            )}
          >
            <div
              className={`w-64 h-80 rounded-2xl border-4 ${getRarityBorder(card.rarity)} 
                        bg-gradient-to-br ${getRarityColor(card.rarity)} 
                        shadow-2xl overflow-hidden relative touch-none`}
            >
              {card.image ? (
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <div className="w-full h-full bg-gray-800 items-center justify-center text-4xl hidden">
                    {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-4xl">
                  {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                </div>
              )}
              
              <div className="p-4 bg-gray-900/90 h-32">
                <h3 className="text-white font-bold text-lg mb-1 truncate">{card.name}</h3>
                {card.team && <p className="text-gray-300 text-sm mb-1 truncate">{card.team}</p>}
                {card.location && <p className="text-gray-300 text-sm mb-1 truncate">{card.location}</p>}
                <div className="flex justify-between items-center mt-2">
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
                   transition-colors backdrop-blur-sm border border-gray-600"
      >
        ←
      </button>
      
      <button
        onClick={() => handleCardNavigation('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
                   bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full 
                   transition-colors backdrop-blur-sm border border-gray-600"
      >
        →
      </button>
      
      {/* Card Counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 
                      bg-gray-800/80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-600">
        <span className="text-white text-sm">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>
    </div>
  );
};

export default CardCarousel;
