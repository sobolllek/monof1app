import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import { cardCategories, cardsData } from '../data/cards';
import { Link } from 'react-router-dom';
import MiniCard from '../components/MiniCard';

const Collection = () => {
  const cards = cardsData;

  // Группируем карты по категориям
  const cardsByCategory = cardCategories.reduce((acc, category) => {
    acc[category.id] = cards.filter(card => card.category === category.id);
    return acc;
  }, {} as Record<string, typeof cardsData>);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* SVG фон */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
        <img 
          src="/svg/collectionsvg1.svg" 
          alt=""
          className="w-full h-full object-cover object-top opacity-60"
        />
      </div>

      {/* Заголовок */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <PageHeader 
          title="Collection" 
          infoTitle="О коллекции"
          infoDescription="Здесь хранятся все ваши карты F1. Собирайте карты пилотов, команд, болидов и трасс. Каждая карта имеет свою редкость и уникальные характеристики."
          showBack={true}
          disableGradient={true}
        />
      </div>

      {/* Контент */}
      <div className="pt-36 pb-20 h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <div className="grid grid-cols-2 gap-6 pb-6">
            {cardCategories.map((category) => {
              const categoryCards = cardsByCategory[category.id] || [];
              const visibleCards = categoryCards.slice(0, 3); // максимум 3 карты

              return (
                <Link
                  key={category.id}
                  to={`/collection/${category.id}`}
                  className="relative aspect-[3/4] flex items-center justify-center overflow-hidden"
                >
                  {/* 3 накладываемые карты */}
                  <div className="relative w-[140px] h-[200px]">
                    {visibleCards.map((card, i) => (
                      <MiniCard
                        key={card.id}
                        card={card}
                        position={-2 + i}
                      />
                    ))}
                  </div>

                  {/* Название и иконка */}
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white">
                    <div className="flex justify-center mb-1">{category.icon()}</div>
                    <div className="text-sm font-semibold">{category.label}</div>
                    <div className="text-xs text-gray-400">{categoryCards.length} карт</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Верхний фиксированный градиент */}
      <div className="fixed top-36 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent z-30 pointer-events-none" />

      {/* Нижний фиксированный градиент */}
      <div className="fixed bottom-8 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />

      {/* Навигация */}
      <Navigation />
    </div>
  );
};

export default Collection;
