import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import { cardCategories, cardsData } from '../data/cards';
import { Link } from 'react-router-dom';
import { CARD_WIDTH, CARD_HEIGHT, CARD_BORDER_RADIUS } from '../data/cards';
import OptimizedImage from '../components/OptimizedImage';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useEffect } from 'react';

const Collection = () => {
  const cards = cardsData;
  const { preloadCriticalImages } = useImagePreloader();

  // Группируем карты по категориям
  const cardsByCategory = cardCategories.reduce((acc, category) => {
    acc[category.id] = cards.filter(card => card.type === category.id);
    return acc;
  }, {} as Record<string, typeof cardsData>);

  // Прелоадинг первых изображений каждой категории
  useEffect(() => {
    const priorityImages = cardCategories
      .flatMap(category => {
        const categoryCards = cardsByCategory[category.id] || [];
        return categoryCards.slice(0, 3).map(card => card.image).filter(Boolean);
      })
      .filter(Boolean) as string[];

    if (priorityImages.length > 0) {
      preloadCriticalImages(priorityImages);
    }
  }, [cardsByCategory, preloadCriticalImages]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
                  className="flex flex-col items-center justify-start overflow-visible"
                >
                  {/* 3 накладываемые карты */}
                  <div className="relative w-[140px] h-[200px] mb-3">
                    {visibleCards.map((card, i) => {
                      const position = -2 + i;
                      let transform = '';
                      let zIndex = 0;

                      if (position === 0) {
                        transform = `translateY(0px) scale(1) rotateZ(0deg)`;
                        zIndex = 30;
                      } else if (position === -1) {
                        transform = `translateY(0px) scale(1) rotateZ(-10deg)`;
                        zIndex = 20;
                      } else if (position === -2) {
                        transform = `translateY(0px) scale(1) rotateZ(-20deg)`;
                        zIndex = 10;
                      }

                      return (
                        <div
                          key={card.id}
                          className="absolute left-1/2 top-1/2 transition-all duration-300 ease-in-out"
                          style={{
                            transform: `translate(-50%, -50%) ${transform}`,
                            zIndex,
                            width: CARD_WIDTH * 0.5,
                            height: CARD_HEIGHT * 0.5,
                            borderRadius: CARD_BORDER_RADIUS,
                          }}
                        >
                          <div className={`w-full h-full bg-gray-900 rounded-[10px] overflow-hidden`}>
                            {card.image ? (
                              <OptimizedImage
                                src={card.image}
                                alt={card.name}
                                width={CARD_WIDTH * 0.5}
                                height={CARD_HEIGHT * 0.5}
                                className="w-full h-full object-cover"
                                priority={i === 0} // Приоритет только для передней карты
                                fallbackIcon={
                                  <div className="text-2xl">
                                    {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                                  </div>
                                }
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-800">
                                {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Название категории и количество карт */}
                  <div className="text-center text-white z-10 relative">
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
