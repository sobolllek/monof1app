import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Card {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  type: 'driver' | 'car' | 'track';
  team?: string;
}

interface PackOpeningAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  packType: string;
  onPackOpened: (cards: Card[]) => void;
}

const PackOpeningAnimation = ({ isOpen, onClose, packType, onPackOpened }: PackOpeningAnimationProps) => {
  const [stage, setStage] = useState<'initial' | 'opening' | 'revealing'>('initial');
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showPackSvg, setShowPackSvg] = useState(true);
  const [showPackTypeSvg, setShowPackTypeSvg] = useState(true);

  const mockCards: Card[] = [
    { id: 1, name: 'CHARLES', rarity: 'epic', type: 'driver', team: 'Ferrari' },
    { id: 2, name: 'Max Verstappen', rarity: 'legendary', type: 'driver', team: 'Red Bull Racing' },
    { id: 3, name: 'Silverstone Circuit', rarity: 'rare', type: 'track' },
  ];

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-400';
      case 'epic': return 'from-purple-400 to-pink-500 border-purple-400';
      case 'rare': return 'from-blue-400 to-cyan-500 border-blue-400';
      default: return 'from-gray-400 to-gray-500 border-gray-400';
    }
  };

  const getPackGradient = (packType: string) => {
    const lowerType = packType.toLowerCase();
    if (lowerType.includes('limit')) return 'from-rainbow-start/30 to-rainbow-end/30 border-rainbow-start/50';
    if (lowerType.includes('prize')) return 'from-green-400/30 to-emerald-500/30 border-green-400/50';
    if (lowerType.includes('gem')) return 'from-purple-400/30 to-pink-500/30 border-purple-400/50';
    if (lowerType.includes('gold')) return 'from-yellow-400/30 to-orange-500/30 border-yellow-400/50';
    return 'from-blue-400/30 to-cyan-500/30 border-blue-400/50';
  };

  const getPackSvgPath = (packType: string) => {
    const lowerType = packType.toLowerCase();
    if (lowerType.includes('limit')) return '/svg/limit.svg';
    if (lowerType.includes('prize')) return '/svg/prize.svg';
    if (lowerType.includes('gem')) return '/svg/gem.svg';
    if (lowerType.includes('gold')) return '/svg/gold.svg';
    return '/svg/base.svg';
  };

  const handleOpenPack = () => {
    setShowPackSvg(false);
    setShowPackTypeSvg(false);
    setStage('opening');
    setTimeout(() => {
      const randomCards = mockCards.sort(() => 0.5 - Math.random()).slice(0, 3);
      setCards(randomCards);
      setStage('revealing');
    }, 1500);
  };

  const handleClose = () => {
    onPackOpened(cards);
    onClose();
    setStage('initial');
    setCards([]);
    setCurrentCardIndex(0);
    setShowPackSvg(true);
    setShowPackTypeSvg(true);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      handleClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsSwiping(true);
    setSwipeOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setSwipeOffset(clientX - (e.currentTarget as HTMLElement).getBoundingClientRect().left - 150);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);

    if (Math.abs(swipeOffset) > 50) {
      handleNextCard();
    }
    setSwipeOffset(0);
  };

  useEffect(() => {
    if (isOpen) {
      setStage('initial');
      setCards([]);
      setCurrentCardIndex(0);
      setShowPackSvg(true);
      setShowPackTypeSvg(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-black pb-20 relative overflow-hidden">
      {/* Background SVGs */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] z-0">
        <img src="/svg/collectionsvg2.svg" alt="bg-bottom" className="w-full h-full object-cover object-bottom opacity-60" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[400px] z-0">
        <img src="/svg/collectionsvg1.svg" alt="bg-top" className="w-full h-full object-cover object-top opacity-60" />
      </div>

      {/* Pack.svg - ТОЧНО КАК В МАРКЕТЕ */}
      {showPackSvg && (
        <div className="absolute bottom-[68%] left-0 right-0 z-10 flex justify-center">
          <div className="h-[65px]">
            <img src="/svg/pack.svg" alt="Pack" className="h-full object-contain" />
          </div>
        </div>
      )}

      {/* Хедер */}
      <header className="fixed top-0 left-0 right-0 z-40 mt-10">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex flex-col items-center justify-center">
            {showPackTypeSvg && ( 
              <div className="h-[70px] flex items-center justify-center">
                <img
                  src={getPackSvgPath(packType)}
                  alt="Pack type"
                  className="h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="absolute inset-0 flex items-center justify-center px-4 z-20 pt-[180px]"> 
        <div className="w-full max-w-md">
          {stage === 'initial' && (
            <div className="flex flex-col items-center space-y-8">
              <div className={`w-64 h-80 bg-gradient-to-br ${getPackGradient(packType)} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="w-48 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-6xl">📦</div>
                </div>
              </div>
              <button
                onClick={handleOpenPack}
                className="bg-white text-black font-bold text-lg py-4 px-12 rounded-full hover:bg-gray-100 transition-colors"
              >
                Открыть
              </button>
            </div>
          )}

          {stage === 'opening' && (
            <div className="flex flex-col items-center">
              <div className={`w-64 h-80 bg-gradient-to-br ${getPackGradient(packType)} rounded-2xl border-2 flex items-center justify-center relative animate-pulse`}>
                <div className="absolute inset-0 animate-ping bg-white/30 rounded-2xl" />
                <Sparkles size={64} className="text-white animate-spin" />
              </div>
            </div>
          )}

          {stage === 'revealing' && cards.length > 0 && (
            <div className="w-full h-full relative">
              <div className="mt-20">
                {cards.map((card, index) => {
                  if (index < currentCardIndex) return null;

                  const isActive = index === currentCardIndex;
                  const zIndex = cards.length - index;
                  const scale = 1 - (index - currentCardIndex) * 0.05;
                  const opacity = 1 - (index - currentCardIndex) * 0.2;
                  const top = (index - currentCardIndex) * 20;
                  const left = isActive ? swipeOffset : 0;

                  return (
                    <div
                      key={card.id}
                      className={`absolute w-full transition-all duration-300 ${isActive ? 'cursor-grab active:cursor-grabbing' : ''}`}
                      style={{
                        zIndex,
                        transform: `translateX(${left}px) scale(${scale})`,
                        opacity,
                        top: `${top}px`,
                      }}
                      onTouchStart={isActive ? handleTouchStart : undefined}
                      onTouchMove={isActive ? handleTouchMove : undefined}
                      onTouchEnd={isActive ? handleTouchEnd : undefined}
                      onMouseDown={isActive ? handleTouchStart : undefined}
                      onMouseMove={isActive ? handleTouchMove : undefined}
                      onMouseUp={isActive ? handleTouchEnd : undefined}
                      onMouseLeave={isActive ? handleTouchEnd : undefined}
                    >
                      <div className="relative w-full max-w-sm mx-auto">
                        <div className="text-center mb-10">
                          <h2 className="text-2xl font-black text-white tracking-wider">{card.name}</h2>
                        </div>

                        <div className={`relative h-96 bg-gradient-to-br ${getRarityColors(card.rarity)} rounded-2xl border-4 overflow-hidden shadow-2xl`}>
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <div className="text-xs text-white/80 font-mono">SECTOR 2</div>
                            <div className="text-xs text-white/80 font-mono">+24</div>
                          </div>

                          <div className="absolute top-8 right-4 w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">F</span>
                          </div>

                          <div className="absolute inset-x-4 top-16 bottom-20 bg-black/20 rounded-xl flex items-center justify-center">
                            <span className="text-white text-4xl">🏎️</span>
                          </div>

                          <div className="absolute left-4 top-1/2 flex flex-col space-y-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <div key={star} className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
                                <span className="text-black text-xs">★</span>
                              </div>
                            ))}
                          </div>

                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="text-xs text-white/60 mb-1">{card.team}</div>
                            <div className="text-xs text-white/80 font-mono">SECTOR 1</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackOpeningAnimation;