
import { useState, useEffect } from 'react';
import { Card } from '../data/cards';

interface CardCarouselProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const CardCarousel = ({ cards, onCardClick }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x: deltaX * 20, y: deltaY * 20 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const getVisibleCards = () => {
    if (cards.length === 0) return [];
    
    const visible = [];
    const totalVisible = Math.min(5, cards.length);
    
    for (let i = 0; i < totalVisible; i++) {
      const index = (currentIndex + i - Math.floor(totalVisible / 2) + cards.length) % cards.length;
      visible.push({
        card: cards[index],
        position: i - Math.floor(totalVisible / 2),
        index
      });
    }
    
    return visible;
  };

  const handleCardNavigation = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleCardNavigation('left');
      if (e.key === 'ArrowRight') handleCardNavigation('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const visibleCards = getVisibleCards();

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400 text-lg">Карты не найдены</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 flex items-center justify-center">
      {visibleCards.map(({ card, position, index }) => {
        const isCenter = position === 0;
        const scale = isCenter ? 1 : 0.8;
        const opacity = isCenter ? 1 : 0.6;
        const translateX = position * 120;
        const rotateY = position * 15;
        const zIndex = isCenter ? 20 : 10 - Math.abs(position);

        return (
          <div
            key={`${card.id}-${index}`}
            className={`absolute transition-all duration-500 cursor-pointer ${
              isCenter ? 'hover:scale-105' : 'hover:scale-90'
            }`}
            style={{
              transform: `
                translateX(${translateX + (isCenter ? mousePosition.x : 0)}px) 
                translateY(${isCenter ? mousePosition.y : 0}px)
                scale(${scale}) 
                rotateY(${rotateY}deg)
                perspective(1000px)
              `,
              opacity,
              zIndex,
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
                        overflow-hidden relative`}
            >
              {/* Card Image */}
              {card.image ? (
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
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
              
              {/* Card Content */}
              <div className="p-4 bg-gray-900/90 h-32">
                <h3 className="text-white font-bold text-lg mb-1 truncate">{card.name}</h3>
                {card.team && (
                  <p className="text-gray-300 text-sm mb-1 truncate">{card.team}</p>
                )}
                {card.location && (
                  <p className="text-gray-300 text-sm mb-1 truncate">{card.location}</p>
                )}
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
