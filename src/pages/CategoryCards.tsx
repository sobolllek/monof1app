import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cardsData } from '../data/cards';
import CardCarousel from '../components/CardCarousel';
import CardModal from '../components/CardModal';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import { Card } from '../data/cards';

const CategoryCards = () => {
  const { categoryId } = useParams();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardName, setCurrentCardName] = useState('');
  const [cards, setCards] = useState<Card[]>(cardsData.filter(card => card.category === categoryId));
  const { toast } = useToast();

  const categoryNames = {
    drivers: 'Пилоты',
    circuits: 'Трассы',
    cars: 'Болиды',
    history: 'История',
    special: 'Особые'
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setShowCardModal(true);
  };

  const handleSellCard = (cardId: number, price: number) => {
    setCards(cards.filter(card => card.id !== cardId));
    toast({
      title: "Карта продана!",
      description: `Вы получили ${price} монет за продажу карты.`,
    });
  };

  const handleGiftCard = (cardId: number, playerName: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    toast({
      title: "Карта подарена!",
      description: `Карта успешно отправлена игроку ${playerName}.`,
    });
  };

  const updateCurrentCardName = (card: Card) => {
    setCurrentCardName(card.name);
  };

  return (
    <div className="min-h-screen bg-black pb-20 relative overflow-hidden">
      {/* Нижний SVG фон */}
      {cards.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-[400px] z-0 pointer-events-none">
          <img 
            src="/svg/collectionsvg2.svg" 
            alt=""
            className="w-full h-full object-cover object-bottom opacity-60"
          />
        </div>
      )}
  
      {/* Верхний SVG фон */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
        <img 
          src="/svg/collectionsvg1.svg" 
          alt=""
          className="w-full h-full object-cover object-top opacity-60"
        />
      </div>
  
      {/* Заголовок */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">
              {categoryNames[categoryId as keyof typeof categoryNames] || 'Коллекция'}
            </h1>
          </div>
        </div>
      </header>
  
      {/* Карусель карточек */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
        <CardCarousel 
          cards={cards} 
          onCardClick={handleCardClick} 
          onCardChange={updateCurrentCardName} 
        />
      </div>
  
      {/* Модалка */}
      <CardModal
        card={selectedCard}
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSell={handleSellCard}
        onGift={handleGiftCard}
      />
  
      {/* Нижняя навигация */}
      <Navigation />
    </div>
  );  
};

export default CategoryCards;
