import { User, MapPin, Car, Calendar, Trophy } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import { cardsData } from '../data/cards';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

const Collection = () => {
  const cards = cardsData;

  const categories: Category[] = [
    { 
      id: 'drivers', 
      label: 'Пилоты', 
      icon: <User size={20} className="text-blue-400" />, 
      count: cards.filter(card => card.category === 'drivers').length 
    },
    { 
      id: 'circuits', 
      label: 'Трассы', 
      icon: <MapPin size={20} className="text-green-400" />, 
      count: cards.filter(card => card.category === 'circuits').length 
    },
    { 
      id: 'cars', 
      label: 'Болиды', 
      icon: <Car size={20} className="text-red-400" />, 
      count: cards.filter(card => card.category === 'cars').length 
    },
    { 
      id: 'history', 
      label: 'История', 
      icon: <Calendar size={20} className="text-purple-400" />, 
      count: cards.filter(card => card.category === 'history').length 
    },
    { 
      id: 'special', 
      label: 'Особые', 
      icon: <Trophy size={20} className="text-yellow-400" />, 
      count: cards.filter(card => card.category === 'special').length 
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Верхний SVG фон */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
        <img 
          src="/svg/collectionsvg1.svg" 
          alt=""
          className="w-full h-full object-cover object-top opacity-60"
        />
      </div>
      
      {/* Фиксированный заголовок */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <PageHeader 
          title="Collection" 
          infoTitle="О коллекции"
          infoDescription="Здесь хранятся все ваши карты F1. Собирайте карты пилотов, команд, болидов и трасс. Каждая карта имеет свою редкость и уникальные характеристики."
          showBack={true}
          disableGradient={true}
        />
      </div>
      
      {/* Основной контент */}
      <div className="pt-36 pb-20 h-screen flex flex-col">
        {/* Статистика коллекции */}
        <div className="f1-card p-4 mx-4 mb-4">
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

        {/* Список категорий с возможностью скролла */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-3 pb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/collection/${category.id}`}
                className="w-full f1-card p-4 hover:bg-gray-800/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] block"
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
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Фиксированная навигация */}
      <Navigation />
    </div>
  );
};

export default Collection;
