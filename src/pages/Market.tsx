import { useState } from 'react';
import { Coins, TrendingUp, TrendingDown, Package, Gift, Star, Gavel, Clock, Users2, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import PackOpeningAnimation from '../components/PackOpeningAnimation';

const Market = () => {
  const [activeTab, setActiveTab] = useState<'shop' | 'buy' | 'sell'>('shop');
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [selectedPack, setSelectedPack] = useState('');
  const [coins, setCoins] = useState(10250);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [shopSection, setShopSection] = useState<'main' | 'packs' | 'coins' | 'cards'>('main');

  const packs = [
    {
      id: 1,
      name: 'Стартовый пак',
      price: 500,
      currency: 'coins',
      description: '3 карты, включая 1 редкую',
      image: '📦',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Премиум пак',
      price: 1200,
      currency: 'coins',
      description: '5 карт, включая 1 эпическую',
      image: '🎁',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'Легендарный пак',
      price: 50,
      currency: 'stars',
      description: '7 карт, гарантированная легендарная',
      image: '💎',
      rarity: 'legendary'
    }
  ];

  const marketItems = [
    { 
      id: 1, 
      name: 'Charles Leclerc', 
      team: 'Ferrari', 
      price: 1500, 
      rarity: 'epic',
      trend: 'up',
      change: '+12%',
      image: '/image/cards/leclerc/png/leclerc-1.png',
      category: 'drivers'
    },
    { 
      id: 2, 
      name: 'Lando Norris', 
      team: 'McLaren', 
      price: 850, 
      rarity: 'rare',
      trend: 'down',
      change: '-5%',
      image: '/image/cards/norris/png/norris-1.png',
      category: 'drivers'
    },
    { 
      id: 3, 
      name: 'Red Bull RB20', 
      team: 'Red Bull Racing', 
      price: 2200, 
      rarity: 'legendary',
      trend: 'up',
      change: '+8%',
      image: '/image/cards/cars/png/rb20-1.png',
      category: 'cars'
    },
  ];

  const auctionItems = [
    {
      id: 1,
      name: 'Max Verstappen',
      team: 'Red Bull Racing',
      currentBid: 3500,
      timeLeft: '2ч 15м',
      bidders: 12,
      rarity: 'legendary',
      image: '/image/cards/verstappen/png/verstappen-1.png',
      category: 'drivers'
    },
    {
      id: 2,
      name: 'Lewis Hamilton',
      team: 'Mercedes',
      currentBid: 2800,
      timeLeft: '45м',
      bidders: 8,
      rarity: 'epic',
      image: '/image/cards/hamilton/png/hamilton-1.png',
      category: 'drivers'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все', icon: '🏎️' },
    { id: 'drivers', name: 'Пилоты', icon: '👤' },
    { id: 'cars', name: 'Машины', icon: '🏎️' },
    { id: 'tracks', name: 'Трассы', icon: '🏁' },
    { id: 'teams', name: 'Команды', icon: '🏢' }
  ];

  const handleBuyPack = (pack: typeof packs[0]) => {
    if (pack.currency === 'coins' && coins >= pack.price) {
      setCoins(coins - pack.price);
      setSelectedPack(pack.name);
      setShowPackOpening(true);
    } else if (pack.currency === 'stars') {
      setSelectedPack(pack.name);
      setShowPackOpening(true);
    }
  };

  const handlePackOpened = (cards: any[]) => {
    console.log('Получены карты:', cards);
  };

  const filteredItems = selectedCategory === 'all' 
    ? marketItems 
    : marketItems.filter(item => item.category === selectedCategory);

  const filteredAuctions = selectedCategory === 'all' 
    ? auctionItems 
    : auctionItems.filter(item => item.category === selectedCategory);

  const renderShopSection = () => {
    if (shopSection === 'packs') {
      return (
        <div className="space-y-4">
          <button 
            onClick={() => setShopSection('main')}
            className="text-f1-orange text-sm hover:underline"
          >
            ← Назад к магазину
          </button>
          
          <h3 className="text-lg font-semibold text-white">Паки карт</h3>
          
          <div className="space-y-4">
            {packs.map((pack) => (
              <div key={pack.id} className="f1-card p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-f1-gray-light rounded-lg flex items-center justify-center text-3xl">
                    {pack.image}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{pack.name}</h4>
                    <p className="text-gray-400 text-sm">{pack.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {pack.currency === 'coins' ? (
                        <><Coins size={16} className="text-yellow-400" /><span className="text-white">{pack.price}</span></>
                      ) : (
                        <><Star size={16} className="text-purple-400" /><span className="text-white">{pack.price}</span></>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBuyPack(pack)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (shopSection === 'coins') {
      return (
        <div className="space-y-4">
          <button 
            onClick={() => setShopSection('main')}
            className="text-f1-orange text-sm hover:underline"
          >
            ← Назад к магазину
          </button>
          
          <h3 className="text-lg font-semibold text-white">Монеты</h3>
          
          <div className="f1-card p-6 text-center">
            <div className="text-6xl mb-4">🪙</div>
            <h4 className="text-white font-semibold mb-2">Скоро!</h4>
            <p className="text-gray-400 text-sm">Покупка монет будет доступна в следующем обновлении</p>
          </div>
        </div>
      );
    }
    
    if (shopSection === 'cards') {
      return (
        <div className="space-y-4">
          <button 
            onClick={() => setShopSection('main')}
            className="text-f1-orange text-sm hover:underline"
          >
            ← Назад к магазину
          </button>
          
          <h3 className="text-lg font-semibold text-white">Эксклюзивные карты</h3>
          
          <div className="f1-card p-6 text-center">
            <div className="text-6xl mb-4">🎴</div>
            <h4 className="text-white font-semibold mb-2">Скоро!</h4>
            <p className="text-gray-400 text-sm">Эксклюзивные карты будут доступны в следующем обновлении</p>
          </div>
        </div>
      );
    }
    
    // Main shop sections
    return (
      <div className="space-y-4">
        {/* PACKS Section */}
        <button
          onClick={() => setShopSection('packs')}
          className="w-full relative bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/30 overflow-hidden hover:from-cyan-500/30 hover:to-blue-600/30 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">PACKS</h3>
                <p className="text-cyan-200 text-sm">Эксклюзивный набор для тебя</p>
              </div>
              <ChevronRight className="text-white" size={24} />
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-20 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
            </div>
          </div>
        </button>

        {/* COINS Section */}
        <button
          onClick={() => setShopSection('coins')}
          className="w-full relative bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-6 border border-yellow-600/30 overflow-hidden hover:from-yellow-600/30 hover:to-orange-600/30 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">COINS</h3>
                <p className="text-yellow-200 text-sm">Монет много не бывает!</p>
              </div>
              <ChevronRight className="text-white" size={24} />
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-20 flex items-center justify-center">
                <span className="text-4xl">🪙</span>
              </div>
            </div>
          </div>
        </button>

        {/* CARDS Section */}
        <button
          onClick={() => setShopSection('cards')}
          className="w-full relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-600/30 overflow-hidden hover:from-purple-600/30 hover:to-pink-600/30 transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">CARDS</h3>
                <p className="text-purple-200 text-sm">Получи доступ к редким картам!</p>
              </div>
              <ChevronRight className="text-white" size={24} />
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-20 flex items-center justify-center">
                <span className="text-4xl">🎴</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      <PageHeader 
        title="Market" 
        infoTitle="О маркете"
        infoDescription="Покупайте паки и лимитированные карты за Telegram Stars, торгуйте картами с другими игроками за монеты, участвуйте в аукционах для получения редких карт."
      />
      
      <div className="p-4 space-y-6">
        {/* Stats Header */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">102</div>
            <div className="text-sm text-gray-400">Карты</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">45</div>
            <div className="text-sm text-gray-400">Обмены</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">10K</div>
            <div className="text-sm text-gray-400">Монеты</div>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-1 bg-gray-900 rounded-full p-1">
          <button
            onClick={() => {
              setActiveTab('shop');
              setShopSection('main');
            }}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
              activeTab === 'shop' 
                ? 'bg-white text-black' 
                : 'text-gray-400'
            }`}
          >
            Магазин
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
              activeTab === 'buy' 
                ? 'bg-white text-black' 
                : 'text-gray-400'
            }`}
          >
            Покупка
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
              activeTab === 'sell' 
                ? 'bg-white text-black' 
                : 'text-gray-400'
            }`}
          >
            Продажа
          </button>
        </div>

        {/* Категории (только для покупки и продажи) */}
        {(activeTab === 'buy' || activeTab === 'sell') && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-f1-red text-white'
                    : 'bg-f1-gray text-gray-400'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Контент вкладок */}
        {activeTab === 'shop' && renderShopSection()}

        {activeTab === 'buy' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Популярные предложения</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative">
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 border border-gray-700 shadow-2xl">
                    <div className="aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center text-6xl hidden">
                        🏎️
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                      <p className="text-gray-400 text-xs truncate">{item.team}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Coins size={12} className="text-yellow-400" />
                          <span className="font-bold text-white text-sm">{item.price.toLocaleString()}</span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${
                          item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {item.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {item.change}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    disabled={coins < item.price}
                    className={`w-full mt-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                      coins >= item.price
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {coins >= item.price ? 'Купить' : 'Недостаточно монет'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="space-y-6">
            {/* Аукцион */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Gavel className="text-f1-orange" size={20} />
                Аукцион
              </h3>
              
              <div className="space-y-3">
                {filteredAuctions.map((item) => (
                  <div key={item.id} className="f1-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 relative">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🏎️</div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <p className="text-gray-400 text-sm">{item.team}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Coins size={16} className="text-yellow-400" />
                            <span className="font-bold text-white">{item.currentBid.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-orange-400">
                            <Clock size={14} />
                            <span className="text-sm">{item.timeLeft}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-blue-400">
                            <Users2 size={14} />
                            <span className="text-sm">{item.bidders}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="bg-f1-red hover:bg-f1-red/80 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Сделать ставку
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Мои лоты */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Мои лоты</h3>
              
              <div className="f1-card p-6 text-center">
                <Gift className="text-gray-400 mx-auto mb-4" size={48} />
                <h4 className="text-white font-semibold mb-2">Нет активных лотов</h4>
                <p className="text-gray-400 text-sm mb-4">Выставьте свои карты на продажу или аукцион</p>
                <div className="flex gap-2">
                  <button className="flex-1 f1-button">Продать карту</button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    На аукцион
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <PackOpeningAnimation
        isOpen={showPackOpening}
        onClose={() => setShowPackOpening(false)}
        packType={selectedPack}
        onPackOpened={handlePackOpened}
      />

      <Navigation />
    </div>
  );
};

export default Market;
