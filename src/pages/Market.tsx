
import { useState } from 'react';
import { Coins, TrendingUp, TrendingDown, Package, Gift } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import PackOpeningAnimation from '../components/PackOpeningAnimation';

const Market = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'packs'>('packs');
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [selectedPack, setSelectedPack] = useState('');
  const [coins, setCoins] = useState(10250);

  const packs = [
    {
      id: 1,
      name: 'Стартовый пак',
      price: 500,
      description: '3 карты, включая 1 редкую',
      image: '📦',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Премиум пак',
      price: 1200,
      description: '5 карт, включая 1 эпическую',
      image: '🎁',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'Легендарный пак',
      price: 2500,
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
      change: '+12%'
    },
    { 
      id: 2, 
      name: 'Lando Norris', 
      team: 'McLaren', 
      price: 850, 
      rarity: 'rare',
      trend: 'down',
      change: '-5%'
    },
    { 
      id: 3, 
      name: 'Red Bull RB20', 
      team: 'Red Bull Racing', 
      price: 2200, 
      rarity: 'legendary',
      trend: 'up',
      change: '+8%'
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getPackGradient = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400/20 to-orange-500/20 border-yellow-400/30';
      case 'rare': return 'from-purple-400/20 to-pink-500/20 border-purple-400/30';
      default: return 'from-blue-400/20 to-cyan-500/20 border-blue-400/30';
    }
  };

  const handleBuyPack = (pack: typeof packs[0]) => {
    if (coins >= pack.price) {
      setCoins(coins - pack.price);
      setSelectedPack(pack.name);
      setShowPackOpening(true);
    }
  };

  const handlePackOpened = (cards: any[]) => {
    console.log('Получены карты:', cards);
    // Здесь можно добавить логику сохранения карт в коллекцию
  };

  return (
    <div className="min-h-screen pb-20">
      <PageHeader 
        title="Маркет" 
        infoTitle="О маркете"
        infoDescription="Покупайте паки с картами и отдельные карты за монеты. Открывайте паки для получения случайных карт разной редкости. Следите за трендами цен и находите выгодные предложения."
      />
      
      <div className="p-4 space-y-6">
        {/* Баланс */}
        <div className="f1-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-f1-gradient rounded-full flex items-center justify-center">
              <Coins className="text-white" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{coins.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Монеты</div>
            </div>
          </div>
          <button className="f1-button text-sm">Пополнить</button>
        </div>

        {/* Табы */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('packs')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'packs' 
                ? 'bg-f1-red text-white' 
                : 'bg-f1-gray text-gray-400'
            }`}
          >
            Паки
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'buy' 
                ? 'bg-f1-red text-white' 
                : 'bg-f1-gray text-gray-400'
            }`}
          >
            Купить
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'sell' 
                ? 'bg-f1-red text-white' 
                : 'bg-f1-gray text-gray-400'
            }`}
          >
            Продать
          </button>
        </div>

        {/* Контент вкладок */}
        {activeTab === 'packs' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Доступные паки</h3>
            <div className="space-y-3">
              {packs.map((pack) => (
                <div key={pack.id} className={`f1-card p-4 bg-gradient-to-r ${getPackGradient(pack.rarity)} border-2`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-f1-gray-light rounded-lg flex items-center justify-center text-2xl">
                      {pack.image}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{pack.name}</h4>
                      <p className="text-gray-300 text-sm">{pack.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Coins size={16} className="text-f1-orange" />
                        <span className="font-bold text-white">{pack.price.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Package className="text-f1-orange mb-2" size={20} />
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBuyPack(pack)}
                    disabled={coins < pack.price}
                    className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                      coins >= pack.price
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {coins >= pack.price ? 'Купить пак' : 'Недостаточно монет'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'buy' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Популярные предложения</h3>
            
            <div className="space-y-3">
              {marketItems.map((item) => (
                <div key={item.id} className="f1-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-f1-gray-light rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs">IMG</span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.team}</p>
                      <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${getRarityColor(item.rarity)}`}>
                        {item.rarity}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Coins size={16} className="text-f1-orange" />
                        <span className="font-bold text-white">{item.price.toLocaleString()}</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${
                        item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {item.change}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    disabled={coins < item.price}
                    className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Ваши лоты</h3>
            
            <div className="f1-card p-6 text-center">
              <Gift className="text-gray-400 mx-auto mb-4" size={48} />
              <h4 className="text-white font-semibold mb-2">Нет активных лотов</h4>
              <p className="text-gray-400 text-sm mb-4">Выставьте свои карты на продажу</p>
              <button className="f1-button">Выставить карту</button>
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
