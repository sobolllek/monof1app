import { useState, useEffect, useCallback } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

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
  const [stage, setStage] = useState<'initial' | 'hold' | 'opening' | 'revealing'>('initial');
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  // Carousel для карт
  const [cardEmblaRef, cardEmblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false
  });

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
    if (lowerType.includes('limit')) {
      return 'from-rainbow-start/30 to-rainbow-end/30 border-rainbow-start/50';
    }
    if (lowerType.includes('prize')) {
      return 'from-green-400/30 to-emerald-500/30 border-green-400/50';
    }
    if (lowerType.includes('gem')) {
      return 'from-purple-400/30 to-pink-500/30 border-purple-400/50';
    }
    if (lowerType.includes('gold')) {
      return 'from-yellow-400/30 to-orange-500/30 border-yellow-400/50';
    }
    // base
    return 'from-blue-400/30 to-cyan-500/30 border-blue-400/50';
  };

  const getPackTitle = (packType: string) => {
    const lowerType = packType.toLowerCase();
    if (lowerType.includes('limit')) return 'LIMITED';
    if (lowerType.includes('prize')) return 'PRIZE';
    if (lowerType.includes('gem')) return 'GEM';
    if (lowerType.includes('gold')) return 'GOLD';
    return 'BASE';
  };

  const onCardSelect = useCallback(() => {
    if (cardEmblaApi) {
      setCurrentCardIndex(cardEmblaApi.selectedScrollSnap());
    }
  }, [cardEmblaApi]);

  useEffect(() => {
    if (!cardEmblaApi) return;
    cardEmblaApi.on('select', onCardSelect);
    onCardSelect();
  }, [cardEmblaApi, onCardSelect]);

  const handleInitialOpen = () => {
    setStage('hold');
  };

  const startHolding = () => {
    if (stage !== 'hold') return;
    setIsHolding(true);
  };

  const stopHolding = () => {
    setIsHolding(false);
    setHoldProgress(0);
  };

  useEffect(() => {
    if (!isHolding) return;

    const interval = setInterval(() => {
      setHoldProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          setStage('opening');
          // Simulate pack opening
          setTimeout(() => {
            const randomCards = mockCards.sort(() => 0.5 - Math.random()).slice(0, 3);
            setCards(randomCards);
            setStage('revealing');
          }, 1500);
          return 100;
        }
        return newProgress;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isHolding]);

  const handleClose = () => {
    onPackOpened(cards);
    onClose();
    setStage('initial');
    setCards([]);
    setCurrentCardIndex(0);
    setHoldProgress(0);
  };

  useEffect(() => {
    if (isOpen) {
      setStage('initial');
      setCards([]);
      setCurrentCardIndex(0);
      setHoldProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md h-full flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-8 right-4 text-white/70 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {/* Pack Type Header */}
        <div className="text-center pt-16 pb-8">
          <h1 className="text-4xl font-black text-white tracking-wider">
            {getPackTitle(packType)}
          </h1>
          <p className="text-lg text-white/60 font-light">({packType.toLowerCase()})</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {stage === 'initial' && (
            <div className="flex flex-col items-center space-y-8">
              <div className={`w-64 h-80 bg-gradient-to-br ${getPackGradient(packType)} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="w-48 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-6xl">📦</div>
                </div>
              </div>
              
              <button
                onClick={handleInitialOpen}
                className="bg-white text-black font-bold text-lg py-4 px-12 rounded-full hover:bg-gray-100 transition-colors"
              >
                Открыть
              </button>
            </div>
          )}

          {stage === 'hold' && (
            <div className="flex flex-col items-center space-y-8">
              <div className={`w-64 h-80 bg-gradient-to-br ${getPackGradient(packType)} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="w-48 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-lg flex items-center justify-center">
                  <div className="text-6xl">📦</div>
                </div>
                {holdProgress > 0 && (
                  <div className="absolute inset-0 bg-white/20 rounded-2xl" style={{ opacity: holdProgress / 100 }} />
                )}
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-white text-lg font-medium">Нажмите и удерживайте</p>
                <p className="text-white text-lg font-medium">чтобы открыть</p>
                
                <button
                  onMouseDown={startHolding}
                  onMouseUp={stopHolding}
                  onMouseLeave={stopHolding}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startHolding();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopHolding();
                  }}
                  onTouchCancel={(e) => {
                    e.preventDefault();
                    stopHolding();
                  }}
                  className="w-64 h-3 bg-gray-600 rounded-full overflow-hidden touch-none select-none"
                  style={{ touchAction: 'none' }}
                >
                  <div 
                    className="h-full bg-white transition-all duration-75 ease-out rounded-full"
                    style={{ width: `${holdProgress}%` }}
                  />
                </button>
              </div>
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

          {stage === 'revealing' && (
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className="overflow-hidden" ref={cardEmblaRef}>
                  <div className="flex">
                    {cards.map((card, index) => (
                      <div key={card.id} className="flex-[0_0_100%] min-w-0 px-4">
                        <div className="relative w-full max-w-sm mx-auto">
                          {/* Card with Ferrari-style design */}
                          <div 
                            className={`relative h-96 bg-gradient-to-br ${getRarityColors(card.rarity)} rounded-2xl border-4 overflow-hidden shadow-2xl`}
                          >
                            {/* Card Header */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                              <div className="text-xs text-white/80 font-mono">SECTOR 2</div>
                              <div className="text-xs text-white/80 font-mono">+24</div>
                            </div>
                            
                            {/* Team Logo Area */}
                            <div className="absolute top-8 right-4 w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">F</span>
                            </div>
                            
                            {/* Driver Image Placeholder */}
                            <div className="absolute inset-x-4 top-16 bottom-20 bg-black/20 rounded-xl flex items-center justify-center">
                              <span className="text-white text-4xl">🏎️</span>
                            </div>
                            
                            {/* Rating Stars */}
                            <div className="absolute left-4 top-1/2 flex flex-col space-y-1">
                              {[1,2,3,4,5].map(star => (
                                <div key={star} className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
                                  <span className="text-black text-xs">★</span>
                                </div>
                              ))}
                            </div>
                            
                            {/* Card Footer */}
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="text-xs text-white/60 mb-1">{card.team}</div>
                              <div className="text-xs text-white/80 font-mono">SECTOR 1</div>
                            </div>
                          </div>
                          
                          {/* Card Name */}
                          <div className="text-center mt-6">
                            <h2 className="text-4xl font-black text-white tracking-wider">{card.name}</h2>
                            <h3 className="text-2xl font-bold text-red-500 mt-1">LECLERC</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-2">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentCardIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-2 px-4">
                <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-medium">
                  ← 
                </button>
                <button 
                  onClick={handleClose}
                  className="flex-1 bg-white text-black py-3 rounded-lg font-bold"
                >
                  Добавить в коллекцию
                </button>
                <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-medium">
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackOpeningAnimation;
