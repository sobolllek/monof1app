
import { useState } from 'react';
import { ChevronRight, Package, Star } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import StatsCard from '../components/StatsCard';
import AchievementCard from '../components/AchievementCard';
import ProfilePacksSection from '../components/ProfilePacksSection';

const Profile = () => {
  const [collectionProgress] = useState(55); // 55% complete

  const achievements = [
    { title: "Скорость? Мы здесь для продаж энергетиков!", completed: true },
    { title: "Стратегия? Наша секретная разработка!", completed: true },
    { title: "Дива? Нет, просто королева!", completed: true },
    { title: "Папайя? Это уже пройденный этап!", completed: false },
    { title: "Инвестиции и зеленая краска. А что дальше?", completed: false },
    { title: "Синий трактор? Скорее французский болгарщик!", completed: false },
    { title: "Мерседес? У нас есть спидометр!", completed: false },
  ];

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      <PageHeader title="Профиль" showSettings />
      
      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="f1-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">username</h2>
              <p className="text-gray-400 text-sm">ID: 123578765</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatsCard label="Обмены" value="153" />
            <StatsCard label="Монеты" value="10K" />
          </div>
        </div>

        {/* Daily Packs Section */}
        <ProfilePacksSection />

        {/* Collection Progress */}
        <div className="f1-card p-6">
          <h3 className="text-lg font-semibold mb-2">Collection</h3>
          <p className="text-gray-400 text-sm mb-4">267 карт в коллекции</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-8 relative overflow-hidden">
              <div 
                className="bg-f1-gradient h-full rounded-full transition-all duration-500 animate-pulse-glow"
                style={{ width: `${collectionProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Weekly Rating */}
        <div className="f1-card p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Weekly Rating</h3>
          <div className="text-4xl font-bold text-f1-orange mb-2">3.97</div>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="text-sm text-gray-400">
            Место: <span className="text-white font-semibold">#234</span>
          </div>
        </div>

        {/* Packs */}
        <div className="f1-card p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Packs</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">108</span>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>

        {/* Achievements */}
        <div className="f1-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Teams</span>
              <ChevronRight size={16} />
            </div>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <AchievementCard 
                key={index}
                title={achievement.title}
                completed={achievement.completed}
              />
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
