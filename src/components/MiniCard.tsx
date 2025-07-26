import React from 'react';
import { CARD_WIDTH, CARD_HEIGHT } from '../data/cards';

interface MiniCardProps {
  card: {
    name: string;
    rarity: string;
    type: string;
  };
  position: number; // -2, -1, 0
  tilt?: {
    middle: number;
    back: number;
  };
}

const getRarityBorder = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'border-yellow-400';
    case 'epic': return 'border-purple-400';
    case 'rare': return 'border-blue-400';
    default: return 'border-gray-400';
  }
};

const getCardIcon = (type: string) => {
  switch (type) {
    case 'driver': return '🏎️';
    case 'car': return '🚗';
    case 'track': return '🏁';
    default: return '🎴';
  }
};

const MiniCard: React.FC<MiniCardProps> = ({
  card,
  position,
  tilt = { middle: -10, back: -20 },
}) => {
  let transform = '';
  let zIndex = 0;

  if (position === 0) {
    transform = `translateY(0px) scale(1) rotateZ(0deg)`;
    zIndex = 30;
  } else if (position === -1) {
    transform = `translateY(0px) scale(1) rotateZ(${tilt.middle}deg)`;
    zIndex = 20;
  } else if (position === -2) {
    transform = `translateY(0px) scale(1) rotateZ(${tilt.back}deg)`;
    zIndex = 10;
  }

  return (
    <div
      className="absolute left-1/2 top-1/2 transition-all duration-300 ease-in-out"
      style={{
        transform: `translate(-50%, -50%) ${transform}`,
        zIndex,
        width: CARD_WIDTH * 0.5,
        height: CARD_HEIGHT * 0.5,
        borderRadius: 10,
      }}
    >
      <div className={`w-full h-full border-2 ${getRarityBorder(card.rarity)} bg-gray-900 rounded-[10px] flex flex-col items-center justify-center text-white text-sm`}>
        <div className="text-3xl mb-2">{getCardIcon(card.type)}</div>
        <div className="px-2 text-center">{card.name}</div>
      </div>
    </div>
  );
};

export default MiniCard;
