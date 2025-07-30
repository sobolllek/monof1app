import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import MyPacksSection from '../components/MyPacksSection';
import SvgCardBlock from '../components/SvgCardBlock';
import SvgTallCardBlock from '../components/SvgTallCardBlock';
import SvgInfoBlock from '../components/SvgInfoBlock';
import { achievementCategories, achievements, type AchievementCategory } from '../data/achievements';
import { cardsData } from '../data/cards';

const Profile = () => {
  const [currentAchievementCategory, setCurrentAchievementCategory] =
    useState<AchievementCategory>('Teams');

  const totalCards = cardsData.length;
  const ownedCards = cardsData.length; // Пока считаем что все собраны
  const collectionProgress = Math.round((ownedCards / totalCards) * 100);

  const currentAchievements = achievements[currentAchievementCategory];

  const switchCategory = (direction: 'prev' | 'next') => {
    const currentIndex = achievementCategories.indexOf(currentAchievementCategory);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % achievementCategories.length;
      setCurrentAchievementCategory(achievementCategories[nextIndex]);
    } else {
      const prevIndex =
        currentIndex === 0 ? achievementCategories.length - 1 : currentIndex - 1;
      setCurrentAchievementCategory(achievementCategories[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black/80 to-transparent z-40">
        <div className="p-4 pt-[3.75rem]">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">Profile</h1>
          </div>
        </div>
      </div>

      <div className="pt-20 p-4 space-y-4 relative">
        {/* Аватар */}
        <div className="relative flex justify-start p-6 z-20 -mb-20">
          <Avatar className="w-[86px] h-[86px]">
            <AvatarFallback className="bg-white text-white text-xl font-bold">
              U
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Инфо-блок */}
        <div className="relative p-4 overflow-hidden rounded-xl h-[101px] mt-0">
  <SvgInfoBlock />

  <div className="relative z-10 flex h-full justify-between items-end">
    {/* Левый блок: имя и ID */}
    <div className="flex flex-col">
      <h2 className="text-[20px] font-bold text-white leading-none">username</h2>
      <p className="text-[#505050] text-[12px] leading-none">ID: 123578765</p>
    </div>

    <img
    src="/svg/vertical-line.svg"
    alt="divider"
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[82px] z-20"
    />

    {/* Правый блок: обмены и монеты */}
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-10">
  <div className="flex flex-col text-right">
    <div className="text-[24px] font-bold text-white leading-none">153</div>
    <div className="text-[13px] text-[#505050]">Обмены</div>
  </div>
  <div className="flex flex-col text-right">
    <div className="text-[24px] font-bold text-white leading-none">10K</div>
    <div className="text-[13px] text-[#505050]">Монеты</div>
  </div>
</div>
  </div>
</div>



        {/* Коллекция и Рейтинг */}
        <div className="grid grid-cols-2 gap-4">
  <SvgCardBlock className="aspect-square w-full">
    <h3 className="text-[#505050] text-[17px] font-semibold">Collection</h3>
    <p className="text-white text-[13px] mb-4">{ownedCards} карт в коллекции</p>
    <div className="space-y-3">
      <div className="flex justify-between text-[9px] text-gray-500 translate-y-2">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
      <div className="relative w-full h-[54px] rounded-sm bg-[#373737] overflow-hidden shadow-inner border border-white/10">
        <div
          className="absolute top-0 bottom-0 w-px bg-[#E5E5E5] left-1/2 -translate-x-1/2 z-10"
          style={{ height: '30px', top: '50%', transform: 'translate(-50%, -50%)' }}
        ></div>
        <div
          className="relative h-full rounded-sm bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.6)] transition-all duration-500"
          style={{ width: `${collectionProgress}%` }}
        ></div>
      </div>
    </div>
  </SvgCardBlock>

  <SvgCardBlock className="aspect-square w-full text-center">
    <h3 className="text-[#505050] text-[17px] font-semibold mb-2">Weekly Rating</h3>
    <div className="flex items-center justify-center gap-2 mb-2">
      <img src="/svg/rt2.svg" alt="left wreath" className="w-33 h-9" />
      <div className="text-[34px] font-bold bg-gradient-to-t from-neutral-500 to-white bg-clip-text text-transparent">
        3.97
      </div>
      <img src="/svg/rt1.svg" alt="right wreath" className="w-33 h-9" />
    </div>
    <div className="relative w-[140px] h-[42px] top-full mt-4 left-1/2 translate-x-[-50%]">
      <img
        src="/svg/mesto.svg"
        alt="place"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
      <div className="relative z-10 w-full h-full flex items-center justify-between px-3">
        <span className="text-[#505050] font-bold text-sm">Место:</span>
        <span className="text-white text-sm">#234</span>
      </div>
    </div>
  </SvgCardBlock>
</div>
        <MyPacksSection />

        <SvgTallCardBlock>
  <CardContent className="p-0 -translate-y-1">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-[#505050] text-[17px] font-semibold">Achievement</h3>
      <div className="flex items-center gap-0">
        <button onClick={() => switchCategory('prev')} className="p-1 text-white hover:opacity-80 transition-opacity">
          <ChevronLeft size={18} />
        </button>
        <span className="min-w-[80px] text-center text-white text-sm font-medium">
          {currentAchievementCategory}
        </span>
        <button onClick={() => switchCategory('next')} className="p-1 text-white hover:opacity-80 transition-opacity">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>

    <div className="space-y-0">
      {currentAchievements.map((achievement, index) => (
        <div key={index}>
          <div className="flex items-center px-3 py-2.5">
            <span className={`text-[13px] flex-1 ${achievement.completed ? 'text-white' : 'text-[#505050]'} leading-none`}>
              {achievement.title}
            </span>
            <div className="w-4 h-4 ml-2 flex-shrink-0">
              {achievement.completed ? (
                <img src="/svg/check.svg" alt="completed" className="w-full h-full" />
              ) : (
                <img src="/svg/cross.svg" alt="not completed" className="w-full h-full" />
              )}
            </div>
          </div>
          {index < currentAchievements.length - 1 && (
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#505050] to-transparent" />
          )}
        </div>
      ))}
    </div>
  </CardContent>
</SvgTallCardBlock>

      </div>
    </div>
  );
};

export default Profile;
