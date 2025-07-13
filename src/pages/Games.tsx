
import { Gamepad2, Car, Map, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';

const Games = () => {
  const metaFeatures = [
    {
      id: 'legend-garage',
      title: 'Гараж Легенд',
      description: 'Виртуальный гараж с 3D-моделями машин. Собирайте команды для разблокировки особых ливрей.',
      icon: Car,
      color: 'from-red-600 to-red-700',
      path: '/legend-garage',
      status: 'Доступно'
    },
    {
      id: 'racer-map',
      title: 'Карта Гонщика',
      description: 'Интерактивная карта мира с трассами, флагами и маршрутами. Собирайте визы стран.',
      icon: Map,
      color: 'from-blue-600 to-blue-700',
      path: '/racer-map',
      status: 'Доступно'
    },
    {
      id: 'team-manager',
      title: 'Менеджер Команды',
      description: 'Управляйте своими командами в мини-симуляторе сезона. Результаты зависят от редкости карт.',
      icon: Users,
      color: 'from-green-600 to-green-700',
      path: '/team-manager',
      status: 'Доступно'
    }
  ];

  const quickGames = [
    {
      title: 'Угадай пилота',
      description: 'Угадывайте пилотов по силуэту шлема',
      difficulty: 'Легко',
      reward: '10-50 монет'
    },
    {
      title: 'Трасса-викторина',
      description: 'Определите трассу по повороту',
      difficulty: 'Средне',
      reward: '25-100 монет'
    },
    {
      title: 'Исторические факты',
      description: 'Вопросы об истории Формулы 1',
      difficulty: 'Сложно',
      reward: '50-200 монет'
    }
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      <PageHeader 
        title="Игры" 
        infoTitle="Игры и развлечения"
        infoDescription="Здесь собраны все игровые активности, включая мета-функции и мини-игры для заработка монет."
      />

      <div className="p-4 space-y-6">
        {/* Meta Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Флагманские функции</h2>
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
                      <span className="text-green-400 text-xs font-semibold">{feature.status}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-f1-orange group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Games */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Быстрые игры</h2>
          <div className="grid gap-3">
            {quickGames.map((game, index) => (
              <div key={index} className="f1-card p-4 hover:bg-f1-gray-light/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{game.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    game.difficulty === 'Легко' ? 'bg-green-900/30 text-green-400' :
                    game.difficulty === 'Средне' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-f1-orange text-sm font-semibold">Награда: {game.reward}</span>
                  <span className="text-gray-500 text-sm">Скоро</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Games;
