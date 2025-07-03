
import { useState } from 'react';
import { Zap, Trophy, Users, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'Гонка на время',
      description: 'Собери комбинацию карт за ограниченное время',
      icon: Clock,
      status: 'available',
      reward: '500 монет',
      players: '1',
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Битва коллекций',
      description: 'Сражайся с другими игроками картами',
      icon: Users,
      status: 'available',
      reward: '1000 монет',
      players: '2-4',
      difficulty: 'medium'
    },
    {
      id: 3,
      title: 'Турнир чемпионов',
      description: 'Еженедельный турнир для лучших игроков',
      icon: Trophy,
      status: 'locked',
      reward: 'Эксклюзивная карта',
      players: '16',
      difficulty: 'hard'
    },
    {
      id: 4,
      title: 'Энергетическое испытание',
      description: 'Используй энергию для бонусных наград',
      icon: Zap,
      status: 'cooldown',
      reward: '750 монет',
      players: '1',
      difficulty: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'border-green-400 bg-green-400/10';
      case 'locked': return 'border-gray-500 bg-gray-500/10';
      case 'cooldown': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Доступно';
      case 'locked': return 'Заблокировано';
      case 'cooldown': return 'Перезарядка';
      default: return '';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      <PageHeader 
        title="Игры" 
        infoTitle="О играх"
        infoDescription="Участвуйте в различных игровых режимах, чтобы заработать монеты и получить новые карты. Каждая игра имеет свои правила и награды."
      />
      
      <div className="p-4 space-y-6">
        {/* Статистика игрока */}
        <div className="f1-card p-4">
          <h3 className="text-lg font-semibold mb-4">Игровая статистика</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-f1-orange">42</div>
              <div className="text-xs text-gray-400">Побед</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-f1-red">18</div>
              <div className="text-xs text-gray-400">Поражений</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">70%</div>
              <div className="text-xs text-gray-400">Винрейт</div>
            </div>
          </div>
        </div>

        {/* Энергия */}
        <div className="f1-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-f1-gradient rounded-full flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <div className="font-semibold text-white">Энергия: 85/100</div>
              <div className="text-sm text-gray-400">Восстановление через 2ч</div>
            </div>
          </div>
          <div className="w-20 h-2 bg-gray-700 rounded-full">
            <div className="w-4/5 h-full bg-f1-gradient rounded-full"></div>
          </div>
        </div>

        {/* Игровые режимы */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Игровые режимы</h3>
          
          <div className="space-y-3">
            {games.map((game) => (
              <div key={game.id} className={`p-4 rounded-xl border-2 ${getStatusColor(game.status)}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-f1-gradient rounded-xl flex items-center justify-center">
                    <game.icon className="text-white" size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{game.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        game.status === 'available' ? 'bg-green-400/20 text-green-400' :
                        game.status === 'locked' ? 'bg-gray-500/20 text-gray-500' :
                        'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {getStatusText(game.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>👥 {game.players}</span>
                      <span className={getDifficultyColor(game.difficulty)}>
                        ⚡ {game.difficulty}
                      </span>
                      <span className="text-f1-orange">🏆 {game.reward}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                    game.status === 'available' 
                      ? 'bg-f1-red hover:bg-f1-red/80 text-white' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={game.status !== 'available'}
                >
                  {game.status === 'available' ? 'Играть' : 'Недоступно'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ежедневные задания */}
        <div className="f1-card p-4">
          <h3 className="text-lg font-semibold mb-4">Ежедневные задания</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-f1-gray-light/50 rounded-lg">
              <span className="text-white text-sm">Выиграй 3 гонки</span>
              <span className="text-f1-orange text-sm">2/3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-f1-gray-light/50 rounded-lg">
              <span className="text-white text-sm">Собери комбо из 5 карт</span>
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-f1-gray-light/50 rounded-lg">
              <span className="text-white text-sm">Потрати 50 энергии</span>
              <span className="text-f1-orange text-sm">35/50</span>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Games;
