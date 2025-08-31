import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../types/cards';
import { CARD_WIDTH, CARD_HEIGHT, CARD_BORDER_RADIUS } from '../data/cards';

interface CardCarouselProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  onCardChange?: (card: Card) => void;
}

const CardCarousel = ({ cards, onCardClick, onCardChange }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCard = cards[currentIndex];

  // Инициализация Vanilla Tilt JS один раз при монтировании
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const applyTilt = () => {
        const tiltElement = containerRef.current?.querySelector('.dm-3d-tilt');
        if (tiltElement && (window as any).VanillaTilt) {
          (window as any).VanillaTilt.init(tiltElement, {
            max: 25,
            speed: 200,
            perspective: 1000,
            glare: true,
            'max-glare': 0.5,
            reset: true,
            reverse: false,
            scale: 1.05,
            gyroscope: true,
            'full-page-listening': false,
          });
        }
      };

      // Применяем эффект сразу и после каждой анимации
      applyTilt();

      // Наблюдатель за появлением новых карт
      const observer = new MutationObserver(() => {
        applyTilt();
      });

      if (containerRef.current) {
        observer.observe(containerRef.current, {
          childList: true,
          subtree: true,
        });
      }

      return () => {
        observer.disconnect();
      };
    };

    return () => {
      const tiltElement = containerRef.current?.querySelector('.dm-3d-tilt');
      if (tiltElement && (tiltElement as any).vanillaTilt) {
        (tiltElement as any).vanillaTilt.destroy();
      }
      document.body.removeChild(script);
    };
  }, []); // Пустой массив зависимостей для однократной инициализации

  useEffect(() => {
    if (onCardChange && currentCard) onCardChange(currentCard);
  }, [currentCard, onCardChange]);

  const goNext = useCallback(() => {
    if (cards.length <= 1 || isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setIsAnimating(false);
    }, 400);
  }, [cards.length, isAnimating]);

  const goPrev = useCallback(() => {
    if (cards.length <= 1 || isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setIsAnimating(false);
    }, 400);
  }, [cards.length, isAnimating]);

  if (!currentCard) return <div>Карты не найдены</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center perspective-1000" ref={containerRef}>
      <div className="text-center mb-8 h-6">
        <p className="text-white text-lg font-medium dm-3d-element">{currentCard.name}</p>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentCard.id}
          className="relative rounded-lg bg-black overflow-hidden cursor-pointer preserve-3d dm-3d-tilt"
          style={{
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            borderRadius: `${CARD_BORDER_RADIUS}px`,
          }}
          custom={direction}
          variants={{
            enter: (direction: 'left' | 'right') => ({
              rotateY: direction === 'right' ? 90 : -90,
              opacity: 0,
              scale: 0.85,
              z: -100,
            }),
            center: {
              rotateY: 0,
              opacity: 1,
              scale: 1,
              z: 0,
            },
            exit: (direction: 'left' | 'right') => ({
              rotateY: direction === 'right' ? -90 : 90,
              opacity: 0,
              scale: 0.85,
              z: -100,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          onClick={() => onCardClick(currentCard)}
        >
          {currentCard.image ? (
            <motion.img
              src={currentCard.image}
              alt={currentCard.name}
              className="w-full h-full object-cover dm-3d-element"
              style={{
                transform: 'translate3d(0px, 0px, 30px)',
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-white dm-3d-element">
              {currentCard.type === 'driver'
                ? '🏎️'
                : currentCard.type === 'car'
                ? '🚗'
                : '🏁'}
            </div>
          )}
          <div className="vanilla-tilt-glare" />
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-3 justify-center">
        <button
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={goPrev}
          disabled={isAnimating || cards.length <= 1}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={goNext}
          disabled={isAnimating || cards.length <= 1}
        >
          Next
        </button>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        Наведите на карту и двигайте мышью для 3D эффекта
      </div>
    </div>
  );
};

export default CardCarousel;
