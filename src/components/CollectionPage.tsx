import React, { useState } from 'react';
import { Card, CARD_RARITIES } from '@/types/cards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CardDetailModal } from '@/components/CardDetailModal';
import { cardCategories, cardsData } from '@/data/cards';

// Преобразуем все карты из данных в формат с информацией о владении
const mockCards: (Card & { owned: boolean; count: number })[] = cardsData.map(card => ({
  ...card,
  owned: true, // Все карты доступны пользователю по умолчанию
  count: Math.random() > 0.8 ? 2 : 1 // 20% карт имеют дубликаты
}));

const rarityColors = {
  ultrasoft: 'bg-pink-500',
  supersoft: 'bg-red-500', 
  soft: 'bg-yellow-500',
  medium: 'bg-white',
  hard: 'bg-orange-500',
  intermediate: 'bg-green-500',
  wet: 'bg-blue-500'
};

const CollectionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Статистика коллекции
  const totalCards = mockCards.length;
  const ownedCards = mockCards.filter(card => card.owned).length;
  const completionPercentage = Math.round((ownedCards / totalCards) * 100);

  // Фильтрация карт по категории
  const filteredCards = mockCards.filter(card => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'ultrasoft') return card.rarity === 'ultrasoft';
    return card.type === selectedCategory;
  });

  // Статистика по категориям
  const getCategoryStats = (categoryId: string) => {
    let categoryCards;
    if (categoryId === 'all') {
      categoryCards = mockCards;
    } else if (categoryId === 'ultrasoft') {
      categoryCards = mockCards.filter(card => card.rarity === 'ultrasoft');
    } else {
      categoryCards = mockCards.filter(card => card.type === categoryId);
    }
    
    const owned = categoryCards.filter(card => card.owned).length;
    const total = categoryCards.length;
    return { owned, total };
  };

  const handleCardClick = (card: Card & { owned: boolean; count: number }) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок коллекции */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Моя коллекция</h1>
          <div className="flex justify-center items-center gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">{ownedCards}</div>
              <div className="text-sm text-gray-300">Получено карт</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalCards}</div>
              <div className="text-sm text-gray-300">Всего карт</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completionPercentage}%</div>
              <div className="text-sm text-gray-300">Завершено</div>
            </div>
          </div>
        </div>

        {/* Фильтры по категориям */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-12 mb-8 overflow-x-auto">
            <TabsTrigger value="all" className="text-xs">
              Все ({getCategoryStats('all').owned}/{getCategoryStats('all').total})
            </TabsTrigger>
            {cardCategories.slice(0, 10).map(category => {
              const stats = getCategoryStats(category.id);
              return (
                <TabsTrigger key={category.id} value={category.id} className="text-xs whitespace-nowrap">
                  {category.label} ({stats.owned}/{stats.total})
                </TabsTrigger>
              );
            })}
            <TabsTrigger value="ultrasoft" className="text-xs">
              Ультрасофт ({getCategoryStats('ultrasoft').owned}/{getCategoryStats('ultrasoft').total})
            </TabsTrigger>
          </TabsList>

          {/* Сетка карт */}
          <TabsContent value={selectedCategory}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredCards.map(card => (
                <div
                  key={card.id}
                  className={`relative bg-black rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    card.owned 
                      ? 'border-blue-400 hover:scale-105 hover:shadow-lg' 
                      : 'border-gray-600 opacity-60'
                  }`}
                  onClick={() => handleCardClick(card)}
                >
                  {/* Значок редкости */}
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className={`${rarityColors[card.rarity]} text-white text-xs`}>
                      {CARD_RARITIES[card.rarity].name}
                    </Badge>
                  </div>

                  {/* Количество карт */}
                  {card.owned && card.count > 1 && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="secondary" className="text-xs">
                        x{card.count}
                      </Badge>
                    </div>
                  )}

                  {/* Изображение карты */}
                  <div className="aspect-[3/4] relative">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-800">
                        {card.type === 'driver' ? '🏎️' : card.type === 'car' ? '🚗' : '🏁'}
                      </div>
                    )}
                    
                    {/* Оверлей для неполученных карт */}
                    {!card.owned && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">НЕ ПОЛУЧЕНА</span>
                      </div>
                    )}
                  </div>

                  {/* Информация о карте */}
                  <div className="p-2">
                    <h3 className="text-white text-sm font-medium truncate">{card.name}</h3>
                    {card.team && (
                      <p className="text-gray-400 text-xs truncate">{card.team}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Модальное окно с деталями карты */}
        <CardDetailModal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default CollectionPage;