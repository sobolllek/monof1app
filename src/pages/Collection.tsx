
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import CardModal from '../components/CardModal';
import { useToast } from '@/hooks/use-toast';

interface Card {
  id: number;
  name: string;
  team?: string;
  location?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  type: 'driver' | 'car' | 'track';
}

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'Все карты' },
    { id: 'drivers', label: 'Пилоты' },
    { id: 'teams', label: 'Команды' },
    { id: 'cars', label: 'Болиды' },
    { id: 'circuits', label: 'Трассы' },
  ];

  // Пример карт
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', rarity: 'legendary', category: 'drivers', type: 'driver' },
    { id: 2, name: 'Lewis Hamilton', team: 'Mercedes', rarity: 'epic', category: 'drivers', type: 'driver' },
    { id: 3, name: 'Ferrari SF-24', team: 'Ferrari', rarity: 'rare', category: 'cars', type: 'car' },
    { id: 4, name: 'Monaco GP', location: 'Monte Carlo', rarity: 'epic', category: 'circuits', type: 'track' },
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10';
      case 'epic': return 'border-purple-400 bg-purple-400/10';
      case 'rare': return 'border-blue-400 bg-blue-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
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

  return (
    <div className="min-h-screen pb-20">
      <PageHeader 
        title="Коллекция карт" 
        infoTitle="О коллекции"
        infoDescription="Здесь хранятся все ваши карты F1. Собирайте карты пилотов, команд, болидов и трасс. Каждая карта имеет свою редкость и уникальные характеристики."
      />
      
      <div className="p-4 space-y-6">
        {/* Поиск и фильтры */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск карт..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-f1-red"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-f1-red text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Статистика коллекции */}
        <div className="f1-card p-4">
          <h3 className="text-lg font-semibold mb-4">Статистика коллекции</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-f1-orange">{cards.length}</div>
              <div className="text-sm text-gray-400">Всего карт</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-f1-red">55%</div>
              <div className="text-sm text-gray-400">Завершено</div>
            </div>
          </div>
        </div>

        {/* Карты */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ваши карты ({filteredCards.length})</h3>
          <div className="grid grid-cols-2 gap-4">
            {filteredCards.map((card) => (
              <div 
                key={card.id} 
                onClick={() => handleCardClick(card)}
                className={`p-4 rounded-xl border-2 ${getRarityColor(card.rarity)} hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">IMG</span>
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{card.name}</h4>
                <p className="text-gray-400 text-xs">
                  {card.team || card.location || ''}
                </p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    card.rarity === 'legendary' ? 'bg-yellow-400/20 text-yellow-400' :
                    card.rarity === 'epic' ? 'bg-purple-400/20 text-purple-400' :
                    card.rarity === 'rare' ? 'bg-blue-400/20 text-blue-400' :
                    'bg-gray-400/20 text-gray-400'
                  }`}>
                    {card.rarity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default Collection;
