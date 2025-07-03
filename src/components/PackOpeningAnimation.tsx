
import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Gift, X } from 'lucide-react';
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
  const [stage, setStage] = useState<'selection' | 'opening' | 'revealing' | 'opened'>('selection');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Carousel для паков
  const [packEmblaRef, packEmblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: true
  });

  // Carousel для карт
  const [cardEmblaRef, cardEmblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false
  });

  const availablePacks = [
    { name: 'Стартовый пак', rarity: 'common', emoji: '📦' },
    { name: 'Премиум пак', rarity: 'rare', emoji: '🎁' },
    { name: 'Легендарный пак', rarity: 'legendary', emoji: '💎' },
  ];

  const mockCards: Card[] = [
    { id: 1, name: 'Max Verstappen', rarity: 'legendary', type: 'driver', team: 'Red Bull Racing' },
    { id: 2, name: 'Charles Leclerc', rarity: 'epic', type: 'driver', team: 'Ferrari' },
    { id: 3, name: 'Silverstone Circuit', rarity: 'rare', type: 'track' },
    { id: 4, name: 'McLaren MCL60', rarity: 'rare', type: 'car', team: 'McLaren' },
    { id: 5, name: 'Lewis Hamilton', rarity: 'epic', type: 'driver', team: 'Mercedes' },
  ];

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500 border-yellow-400';
      case 'epic': return 'from-purple-400 to-pink-500 border-purple-400';
      case 'rare': return 'from-blue-400 to-cyan-500 border-blue-400';
      default: return 'from-gray-400 to-gray-500 border-gray-400';
    }
  };

  const getPackGradient = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400/20 to-orange-500/20 border-yellow-400/50';
      case 'rare': return 'from-purple-400/20 to-pink-500/20 border-purple-400/50';
      default: return 'from-blue-400/20 to-cyan-500/20 border-blue-400/50';
    }
  };

  const onPackSelect = useCallback(() => {
    if (packEmblaApi) {
      setSelectedPackIndex(packEmblaApi.selectedScrollSnap());
    }
  }, [packEmblaApi]);

  const onCardSelect = useCallback(() => {
    if (cardEmblaApi) {
      setCurrentCardIndex(cardEmblaApi.selectedScrollSnap());
    }
  }, [cardEmblaApi]);

  useEffect(() => {
    if (!packEmblaApi) return;
    packEmblaApi.on('select', onPackSelect);
    onPackSelect();
  }, [packEmblaApi, onPackSelect]);

  useEffect(() => {
    if (!cardEmblaApi) return;
    cardEmblaApi.on('select', onCardSelect);
    onCardSelect();
  }, [cardEmblaApi, onCardSelect]);

  const handlePackOpen = () => {
    setStage('opening');
    // Simulate pack opening sequence
    setTimeout(() => {
      const randomCards = mockCards.sort(() => 0.5 - Math.random()).slice(0, 3);
      setCards(randomCards);
      setStage('revealing');
    }, 2000);
    setTimeout(() => setStage('opened'), 3000);
  };

  const handleClose = () => {
    onPackOpened(cards);
    onClose();
    setStage('selection');
    setCards([]);
    setSelectedPackIndex(0);
    setCurrentCardIndex(0);
  };

  useEffect(() => {
    if (isOpen) {
      setStage('selection');
      setCards([]);
      setSelectedPackIndex(0);
      setCurrentCardIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {stage === 'selection' && (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Выберите пак</h2>
            <p className="text-gray-300 text-center">Свайпните для выбора пака</p>
            
            <div className="w-full max-w-xs">
              <div className="overflow-hidden" ref={packEmblaRef}>
                <div className="flex">
                  {availablePacks.map((pack, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                      <div className={`w-full h-80 bg-gradient-to-br ${getPackGradient(pack.rarity)} rounded-xl border-2 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="text-6xl mb-4">{pack.emoji}</div>
                        <h3 className="text-white font-bold text-xl text-center">{pack.name}</h3>
                        <p className="text-white/80 text-sm mt-2">Нажмите чтобы открыть</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handlePackOpen}
              className="f1-button text-lg py-3 px-8"
            >
              Открыть пак
            </button>
          </div>
        )}

        {stage === 'opening' && (
          <div className="flex flex-col items-center">
            <div className="w-48 h-64 bg-gradient-to-br from-f1-red to-f1-orange rounded-xl border-2 border-f1-orange/50 flex items-center justify-center relative animate-pulse">
              <div className="absolute inset-0 animate-ping bg-white/20 rounded-xl" />
              <Sparkles size={64} className="text-white animate-spin" />
            </div>
            <p className="text-white mt-4 text-lg">Открываем пак...</p>
          </div>
        )}

        {(stage === 'revealing' || stage === 'opened') && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Поздравляем!</h2>
              <p className="text-gray-300">Свайпните для просмотра карт</p>
            </div>
            
            <div className="w-full">
              <div className="overflow-hidden" ref={cardEmblaRef}>
                <div className="flex">
                  {cards.map((card, index) => (
                    <div key={card.id} className="flex-[0_0_100%] min-w-0 px-4">
                      <div
                        className={`f1-card p-6 border-2 bg-gradient-to-r ${getRarityColors(card.rarity)} ${
                          stage === 'revealing' 
                            ? 'animate-fade-in opacity-0' 
                            : 'animate-scale-in'
                        } h-80 flex flex-col justify-between`}
                        style={{ 
                          animationDelay: stage === 'revealing' ? `${index * 300}ms` : '0ms',
                          animationFillMode: 'forwards'
                        }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-32 bg-black/20 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-white text-sm">IMG</span>
                          </div>
                          <h3 className="font-bold text-white text-xl mb-2">{card.name}</h3>
                          {card.team && <p className="text-white/80 text-sm mb-2">{card.team}</p>}
                          <span className="inline-block px-3 py-1 bg-black/30 rounded-full text-sm text-white">
                            {card.rarity}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Sparkles className="text-white/80" size={24} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentCardIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {stage === 'opened' && (
              <button
                onClick={handleClose}
                className="w-full f1-button mt-6"
              >
                Добавить в коллекцию
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackOpeningAnimation;
