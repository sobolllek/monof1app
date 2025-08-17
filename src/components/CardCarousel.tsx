import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../types/cards';
import { CARD_WIDTH, CARD_HEIGHT, CARD_BORDER_RADIUS } from '../data/cards';
import OptimizedImage from './OptimizedImage';
import { useImagePreloader } from '../hooks/useImagePreloader';

interface CardCarouselProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  onCardChange?: (card: Card) => void;
  middleTilt?: number;
  backTilt?: number;
  bottomTilt?: number;
}

const CardCarousel = ({
  cards,
  onCardClick,
  onCardChange,
  middleTilt = -7,
  backTilt = -15,
  bottomTilt = 0,
}: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);
  const { preloadCriticalImages, preloadBackgroundImages } = useImagePreloader();

  const getCenterCard = useCallback(() => cards[currentIndex], [cards, currentIndex]);

  const getVisibleCards = useCallback(() => {
    const visible = [];
    for (let i = -2; i <= 1; i++) {
      const index = (currentIndex + i + cards.length) % cards.length;
      visible.push({
        card: cards[index],
        position: i,
        index,
      });
    }
    return visible;
  }, [cards, currentIndex]);

  useEffect(() => {
    if (onCardChange && cards.length > 0) {
      onCardChange(getCenterCard());
    }
  }, [currentIndex, cards, onCardChange, getCenterCard]);

  // Прелоадинг изображений
  useEffect(() => {
    if (cards.length === 0) return;

    const visibleCardImages = getVisibleCards()
      .map(({ card }) => card.image)
      .filter(Boolean) as string[];

    const nextCardImages = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentIndex + i) % cards.length;
      const prevIndex = (currentIndex - i + cards.length) % cards.length;
      if (cards[nextIndex]?.image) nextCardImages.push(cards[nextIndex].image);
      if (cards[prevIndex]?.image) nextCardImages.push(cards[prevIndex].image);
    }

    // Приоритетная загрузка видимых карт
    preloadCriticalImages(visibleCardImages);
    
    // Фоновая загрузка соседних карт
    preloadBackgroundImages(nextCardImages);
  }, [currentIndex, cards, getVisibleCards, preloadCriticalImages, preloadBackgroundImages]);

  useEffect(() => {
    setPreviousIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isSwiping.current) e.preventDefault();
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

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
    const deltaX = touchEndX.current - touchStartX.current;
    const threshold = 50;
    if (deltaX < -threshold) handleCardNavigation('right');
    else if (deltaX > threshold) handleCardNavigation('left');
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) handleCardNavigation('right');
      else handleCardNavigation('left');
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
    <div className="w-full">
      <div className="text-center mb-4 h-6">
        <p className="text-white text-lg font-medium">
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
          let transform = '';
          let zIndex = 0;

          const isNewBackCard =
            position === -2 &&
            (index + cards.length) % cards.length ===
              (currentIndex - 2 + cards.length) % cards.length &&
            (index + cards.length) % cards.length !==
              (previousIndex - 2 + cards.length) % cards.length;

          if (position === 0) {
            transform = `translateY(${mousePosition.y}px) scale(1) rotateZ(0deg)`;
            zIndex = 30;
          } else if (position === -1) {
            transform = `translateY(0px) scale(1) rotateZ(${middleTilt}deg)`;
            zIndex = 20;
          } else if (position === -2) {
            const translateY = isNewBackCard ? '800px' : '0px';
            transform = `translateY(${translateY}) scale(1) rotateZ(${backTilt}deg)`;
            zIndex = 10;
          } else if (position === 1) {
            transform = `translateY(400px) scale(1) rotateZ(${bottomTilt}deg)`;
            zIndex = 20;
          }

          return (
            <div
              key={`${card.id}-${index}`}
              className={`absolute transition-all duration-500 ease-in-out cursor-pointer touch-none ${isCenter ? 'hover:scale-105' : ''}`}
              style={{
                transform,
                zIndex,
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
                translate: '-50% -50%',
              }}
              onClick={() => {
                if (isCenter) onCardClick(card);
                else setCurrentIndex(index);
              }}
              onMouseMove={isCenter ? handleMouseMove : undefined}
              onMouseLeave={isCenter ? handleMouseLeave : undefined}
            >
                <div className="bg-black overflow-hidden"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    borderRadius: `${CARD_BORDER_RADIUS}px`,
                  }}>
                  {card.image ? (
                    <OptimizedImage
                      src={card.image}
                      alt={card.name}
                      width={CARD_WIDTH}
                      height={CARD_HEIGHT}
                      className="w-full h-full object-cover touch-none"
                      priority={isCenter}
                      fallbackIcon={
                        <div className="text-4xl">
                          {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                        </div>
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl fallback-icon bg-black">
                      {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                    </div>
                  )}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardCarousel;