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

  return (
    <div className="min-h-screen bg-black pb-20">
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

      <Navigation />
    </div>
  );
};

export default Collection;
