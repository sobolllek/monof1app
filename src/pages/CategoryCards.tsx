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
    <div className="min-h-screen bg-black pb-20">
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black/80 to-transparent z-40">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">
              {categoryNames[categoryId as keyof typeof categoryNames] || 'Коллекция'}
            </h1>
          </div>
        </div>
      </header>

      {/* Основной контент с отступом сверху */}
      <div className="pt-32 px-4">
        <CardCarousel 
          cards={cards} 
          onCardClick={handleCardClick} 
          onCardChange={updateCurrentCardName} 
        />
      </div>

      <CardModal
        card={selectedCard}
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSell={handleSellCard}
        onGift={handleGiftCard}
      />

      <Navigation />
    </div>
  );
};

export default CategoryCards;
