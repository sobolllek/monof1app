import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

  // Получаем название категории для заголовка
  const getCategoryName = () => {
    switch (categoryId) {
      case 'drivers': return 'Пилоты';
      case 'circuits': return 'Трассы';
      case 'cars': return 'Болиды';
      case 'history': return 'История';
      case 'special': return 'Особые';
      default: return 'Категория';
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="p-10">
        <div className="flex items-center gap-4 mb-6">
          <a
            href="/collection"
            className="p-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </a>
          <h1 className="text-2xl font-bold text-white">{getCategoryName()}</h1>
        </div>

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