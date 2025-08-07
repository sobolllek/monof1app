import { Gamepad2, Car, Map, Users, ChevronRight, Code } from 'lucide-react';
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
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      <PageHeader 
        title="Игры" 
        infoTitle="Игры и развлечения"
        infoDescription="Здесь собраны все игровые активности, включая мета-функции и мини-игры для заработка монет."
      />

      <div className="p-4 space-y-6 pt-32">
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
