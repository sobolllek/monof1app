
import { useState } from 'react';
import { Search, Filter, Send, Eye, Clock, Star, ArrowRightLeft, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface TradeOffer {
  id: number;
  type: 'incoming' | 'outgoing' | 'active';
  player: {
    name: string;
    avatar: string;
    rating: number;
  };
  offering: {
    id: number;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    category: string;
  }[];
  requesting: {
    id: number;
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    category: string;
  }[];
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: string;
}

const Trades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [activeTab, setActiveTab] = useState('offers');
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'Все', icon: '🏁' },
    { id: 'drivers', label: 'Пилоты', icon: '👤' },
    { id: 'teams', label: 'Команды', icon: '🏎️' },
    { id: 'cars', label: 'Болиды', icon: '🚗' },
    { id: 'circuits', label: 'Трассы', icon: '🏁' },
    { id: 'history', label: 'История', icon: '📚' },
    { id: 'special', label: 'Особые', icon: '⭐' },
  ];

  const rarities = [
    { id: 'all', label: 'Все редкости', color: 'text-gray-400' },
    { id: 'common', label: 'Обычные', color: 'text-gray-400' },
    { id: 'rare', label: 'Редкие', color: 'text-blue-400' },
    { id: 'epic', label: 'Эпические', color: 'text-purple-400' },
    { id: 'legendary', label: 'Легендарные', color: 'text-yellow-400' },
  ];

  // Пример предложений обмена
  const [tradeOffers] = useState<TradeOffer[]>([
    {
      id: 1,
      type: 'incoming',
      player: { name: 'RacingFan2023', avatar: '🏎️', rating: 2150 },
      offering: [
        { id: 101, name: 'Charles Leclerc', rarity: 'epic', category: 'drivers' },
        { id: 102, name: 'Ferrari SF-24', rarity: 'rare', category: 'cars' }
      ],
      requesting: [
        { id: 201, name: 'Max Verstappen', rarity: 'legendary', category: 'drivers' }
      ],
      status: 'pending',
      createdAt: '2 часа назад'
    },
    {
      id: 2,
      type: 'outgoing',
      player: { name: 'F1Collector', avatar: '🏆', rating: 1890 },
      offering: [
        { id: 301, name: 'Lewis Hamilton', rarity: 'legendary', category: 'drivers' }
      ],
      requesting: [
        { id: 401, name: 'Monaco GP', rarity: 'epic', category: 'circuits' },
        { id: 402, name: 'McLaren MCL38', rarity: 'rare', category: 'cars' }
      ],
      status: 'pending',
      createdAt: '1 день назад'
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const handleAcceptTrade = (tradeId: number) => {
    toast({
      title: "Обмен принят!",
      description: "Карты успешно обменены и добавлены в вашу коллекцию.",
    });
  };

  const handleDeclineTrade = (tradeId: number) => {
    toast({
      title: "Обмен отклонён",
      description: "Предложение обмена было отклонено.",
    });
  };

  const TradeCard = ({ offer }: { offer: TradeOffer }) => (
    <div className="f1-card p-4 space-y-4">
      {/* Заголовок обмена */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-f1-red rounded-full flex items-center justify-center text-xl">
            {offer.player.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{offer.player.name}</h3>
            <p className="text-sm text-gray-400">Рейтинг: {offer.player.rating}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {offer.type === 'incoming' && (
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
              Входящий
            </span>
          )}
          {offer.type === 'outgoing' && (
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
              Исходящий
            </span>
          )}
          <span className="text-xs text-gray-400">{offer.createdAt}</span>
        </div>
      </div>

      {/* Карты в обмене */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Предлагает */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Send size={16} />
            Предлагает ({offer.offering.length})
          </h4>
          <div className="space-y-2">
            {offer.offering.map((card) => (
              <div key={card.id} className={`p-2 rounded border ${getRarityColor(card.rarity)} bg-opacity-10`}>
                <div className="font-medium text-sm">{card.name}</div>
                <div className="text-xs text-gray-400">{card.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Хочет получить */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Eye size={16} />
            Хочет получить ({offer.requesting.length})
          </h4>
          <div className="space-y-2">
            {offer.requesting.map((card) => (
              <div key={card.id} className={`p-2 rounded border ${getRarityColor(card.rarity)} bg-opacity-10`}>
                <div className="font-medium text-sm">{card.name}</div>
                <div className="text-xs text-gray-400">{card.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Действия */}
      {offer.type === 'incoming' && offer.status === 'pending' && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => handleAcceptTrade(offer.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Принять
          </button>
          <button
            onClick={() => handleDeclineTrade(offer.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Отклонить
          </button>
        </div>
      )}

      {offer.type === 'outgoing' && offer.status === 'pending' && (
        <div className="flex justify-center pt-2">
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <Clock size={16} />
            Ожидает ответа
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pb-20">
      <PageHeader 
        title="Обмены карт" 
        infoTitle="О системе обменов"
        infoDescription="Здесь вы можете обмениваться картами с другими игроками. Создавайте предложения, ищите нужные карты и заключайте выгодные сделки. Все обмены безопасны и мгновенны."
      />
      
      <div className="p-4 space-y-6">
        {/* Поиск и фильтры */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск игроков или карт..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-f1-red"
            />
          </div>

          {/* Категории */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Категории</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-f1-red text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Редкость */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Редкость</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {rarities.map((rarity) => (
                <button
                  key={rarity.id}
                  onClick={() => setSelectedRarity(rarity.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                    selectedRarity === rarity.id
                      ? 'bg-f1-red text-white border-f1-red'
                      : `bg-gray-800 ${rarity.color} border-gray-700 hover:border-gray-600`
                  }`}
                >
                  {rarity.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Статистика обменов */}
        <div className="grid grid-cols-3 gap-4">
          <div className="f1-card p-4 text-center">
            <div className="text-2xl font-bold text-f1-orange">12</div>
            <div className="text-sm text-gray-400">Активных</div>
          </div>
          <div className="f1-card p-4 text-center">
            <div className="text-2xl font-bold text-green-400">47</div>
            <div className="text-sm text-gray-400">Завершено</div>
          </div>
          <div className="f1-card p-4 text-center">
            <div className="text-2xl font-bold text-f1-red">3</div>
            <div className="text-sm text-gray-400">Ожидают</div>
          </div>
        </div>

        {/* Кнопка создания обмена */}
        <button className="w-full bg-f1-gradient hover:opacity-90 text-white py-4 px-6 rounded-xl font-semibold transition-opacity flex items-center justify-center gap-2">
          <ArrowRightLeft size={20} />
          Создать предложение обмена
        </button>

        {/* Вкладки */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="offers" className="data-[state=active]:bg-f1-red">
              Предложения
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-f1-red">
              Поиск
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-f1-red">
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User size={20} />
              Активные предложения
            </h3>
            {tradeOffers.map((offer) => (
              <TradeCard key={offer.id} offer={offer} />
            ))}
          </TabsContent>

          <TabsContent value="search" className="space-y-4 mt-6">
            <div className="f1-card p-6 text-center">
              <Search size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Поиск обменов</h3>
              <p className="text-gray-400 mb-4">
                Найдите игроков, у которых есть нужные вам карты
              </p>
              <button className="bg-f1-red hover:bg-f1-red-dark text-white py-2 px-6 rounded-lg font-medium transition-colors">
                Начать поиск
              </button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            <div className="f1-card p-6 text-center">
              <Clock size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">История обменов</h3>
              <p className="text-gray-400">
                Здесь будут отображаться ваши завершённые обмены
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Navigation />
    </div>
  );
};

export default Trades;
