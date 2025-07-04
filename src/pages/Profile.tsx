import { useState } from 'react';
import { ChevronRight, ChevronLeft, Settings, Package } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import ProfilePacksSection from '../components/ProfilePacksSection';
import PageHeader from '../components/PageHeader'; // Импорт PageHeader

const Profile = () => {
  const [collectionProgress] = useState(55);
  const [currentAchievementCategory, setCurrentAchievementCategory] = useState('Teams');

  const achievementCategories = ['Teams', 'Drivers', 'Circuits', 'Records'];

  const achievements = {
    Teams: [
      { title: "Скорость? Мы здесь для продаж энергетиков!", completed: true },
      { title: "Стратегия? Наша секретная разработка!", completed: true },
      { title: "Дива? Нет, просто королева!", completed: true },
      { title: "Папайя? Это уже пройденный этап!", completed: false },
      { title: "Инвестиции и зеленая краска. А что дальше?", completed: false },
      { title: "Синий трактор? Скорее французский болид!", completed: false },
      { title: "Мерседес? У нас есть спидометр!", completed: false },
    ],
    Drivers: [
      { title: "Король скорости Макс Ферстаппен", completed: true },
      { title: "Легенда Льюис Хэмилтон", completed: false },
      { title: "Восходящая звезда Шарль Леклер", completed: true },
      { title: "Мастер дождя Ландо Норрис", completed: false },
    ],
    Circuits: [
      { title: "Покоритель Монако", completed: true },
      { title: "Мастер Сильверстоуна", completed: false },
      { title: "Храм скорости Монца", completed: false },
      { title: "Легенда Спа-Франкоршам", completed: true },
    ],
    Records: [
      { title: "100 побед в коллекции", completed: false },
      { title: "Собрано 50 редких карт", completed: true },
      { title: "Месяц без пропусков", completed: false },
      { title: "Первый обмен", completed: true },
    ]
  };

  const currentAchievements = achievements[currentAchievementCategory as keyof typeof achievements];

  const switchCategory = (direction: 'prev' | 'next') => {
    const currentIndex = achievementCategories.indexOf(currentAchievementCategory);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % achievementCategories.length;
      setCurrentAchievementCategory(achievementCategories[nextIndex]);
    } else {
      const prevIndex = currentIndex === 0 ? achievementCategories.length - 1 : currentIndex - 1;
      setCurrentAchievementCategory(achievementCategories[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <PageHeader showBack showSettings />

      <div className="pt-32 p-4 space-y-6">
        {/* User Profile Card */}
        <Card className="f1-card p-6">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-f1-red text-white text-xl font-bold">
                  UN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">username</h2>
                <p className="text-gray-400">ID: 123578765</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">153</div>
                <div className="text-sm text-gray-400">Обмены</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K</div>
                <div className="text-sm text-gray-400">Монеты</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Collection Progress */}
          <Card className="f1-card p-4">
            <CardContent className="p-0">
              <h3 className="text-white font-semibold mb-2">Коллекция</h3>
              <p className="text-gray-400 text-sm mb-4">267 карт в коллекции</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
                  <div 
                    className="bg-f1-red h-full rounded-full transition-all duration-500"
                    style={{ width: `${collectionProgress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Rating */}
          <Card className="f1-card p-4 text-center">
            <CardContent className="p-0">
              <h3 className="text-white font-semibold mb-2">Рейтинг</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-500">🏆</span>
                <div className="text-2xl font-bold text-white">3.97</div>
                <span className="text-yellow-500">🏆</span>
              </div>
              <div className="bg-gray-800/50 rounded-lg px-3 py-1 inline-block">
                <span className="text-sm text-gray-400">Место: </span>
                <span className="text-white font-semibold">#234</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Packs Section */}
        <ProfilePacksSection />

        {/* Achievements */}
        <Card className="f1-card p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Достижения</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchCategory('prev')}
                  className="p-1 hover:bg-gray-800/50"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="min-w-[80px] text-center">{currentAchievementCategory}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchCategory('next')}
                  className="p-1 hover:bg-gray-800/50"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {currentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <span className={`text-sm ${achievement.completed ? 'text-white' : 'text-gray-500'}`}>
                    {achievement.title}
                  </span>
                  <div className="text-lg">
                    {achievement.completed ? '✅' : '❌'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
