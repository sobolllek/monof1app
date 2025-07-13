import { useState } from 'react';
import { ArrowLeft, User, MapPin, Car, Calendar, Trophy } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import CardModal from '../components/CardModal';
import CardCarousel from '../components/CardCarousel';
import { useToast } from '@/hooks/use-toast';
import { cardsData, Card } from '../data/cards';

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCardName, setCurrentCardName] = useState(''); // Добавляем состояние для имени текущей карты
  const { toast } = useToast();

  const [cards, setCards] = useState<Card[]>(cardsData);

  const categories: Category[] = [
    { 
      id: 'drivers', 
      label: 'Пилоты', 
      icon: <User size={24} className="text-blue-400" />, 
      count: cards.filter(card => card.category === 'drivers').length 
    },
    { 
      id: 'circuits', 
      label: 'Трассы', 
      icon: <MapPin size={24} className="text-green-400" />, 
      count: cards.filter(card => card.category === 'circuits').length 
    },
    { 
      id: 'cars', 
      label: 'Болиды', 
      icon: <Car size={24} className="text-red-400" />, 
      count: cards.filter(card => card.category === 'cars').length 
    },
    { 
      id: 'history', 
      label: 'История', 
      icon: <Calendar size={24} className="text-purple-400" />, 
      count: cards.filter(card => card.category === 'history').length 
    },
    { 
      id: 'special', 
      label: 'Особые', 
      icon: <Trophy size={24} className="text-yellow-400" />, 
      count: cards.filter(card => card.category === 'special').length 
    },
  ];

  const filteredCards = cards.filter(card => {
    if (selectedCategory && card.category !== selectedCategory) return false;
    return true;
  });

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

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  // Функция для обновления имени текущей карты
  const updateCurrentCardName = (card: Card) => {
    setCurrentCardName(card.name);
  };

  // Если выбрана категория, показываем карусель карт
  if (selectedCategory) {
    const categoryData = categories.find(cat => cat.id === selectedCategory);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pb-20">
        <div className="p-10">
          {/* Header с кнопкой назад */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBackToCategories}
              className="p-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div className="flex items-center gap-3">
              {categoryData?.icon}
              <h1 className="text-2xl font-bold text-white">{categoryData?.label}</h1>
            </div>
          </div>

          {/* Карусель карт с передачей функции обновления имени */}
          <CardCarousel 
            cards={filteredCards} 
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
  }

  // Главный экран с выбором категорий
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pb-20">
      <PageHeader 
        title="Коллекция карт" 
        infoTitle="О коллекции"
        infoDescription="Здесь хранятся все ваши карты F1. Собирайте карты пилотов, команд, болидов и трасс. Каждая карта имеет свою редкость и уникальные характеристики."
      />
      
      <div className="p-4 space-y-6">
        {/* Статистика коллекции */}
        <div className="f1-card p-4">
          <h3 className="text-lg font-semibold mb-4">Статистика коллекции</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-f1-orange">{cards.length}</div>
              <div className="text-sm text-gray-400">Всего карт</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-f1-red">
                {Math.round((cards.filter(card => card.rarity !== 'common').length / cards.length) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Редких карт</div>
            </div>
          </div>
        </div>

        {/* Список категорий */}
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="w-full f1-card p-4 hover:bg-gray-800/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gray-800/50">
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">{category.label}</h3>
                    <p className="text-sm text-gray-400">{category.count} карт</p>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Collection;
