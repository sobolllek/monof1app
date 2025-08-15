import { Gamepad2, Car, Map, Users, ChevronRight, Code, Coins, Bomb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';

const Games = () => {
  const metaFeatures = [
    {
      id: 'coin-flip',
      title: 'Монетка',
      description: 'Испытай удачу и удвой свою ставку, подбрасывая монетку.',
      icon: Coins,
      color: 'from-yellow-500 to-yellow-600',
      path: '/coin-flip',
      status: 'Доступно'
    },
    {
      id: 'racing-sapper',
      title: 'Гоночный сапёр',
      description: 'Открывай клетки, избегай бомб и забирай выигрыш вовремя.',
      icon: Bomb,
      color: 'from-purple-500 to-purple-600',
      path: '/racing-sapper',
      status: 'Доступно'
    },
    {
      id: 'code-strategy',
      title: 'Код Стратегии',
      description: 'Программируйте тактику гонки через специальный язык команд. Оптимизируйте алгоритмы победы.',
      icon: Code,
      color: 'from-amber-600 to-amber-700',
      path: '/code-strategy',
      status: 'Эксклюзив'
    }
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      <PageHeader 
        title="Игры" 
        infoTitle="Игры и развлечения"
        infoDescription="Здесь собраны все игровые активности, включая мета-функции и мини-игры для заработка монет."
      />

      <div className="p-4 space-y-6 pt-32">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Доступные игры</h2>
          <div className="space-y-3">
            {metaFeatures.map((feature) => (
              <Link
                key={feature.id}
                to={feature.path}
                className="f1-card p-4 flex items-center justify-between hover:bg-f1-gray-light/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-semibold ${
                        feature.status === 'Доступно' ? 'text-green-400' : 
                        feature.status === 'Эксклюзив' ? 'text-amber-400' : 'text-purple-400'
                      }`}>
                        {feature.status}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-f1-orange group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Games;