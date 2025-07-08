import { useState } from 'react';
import Navigation from '../components/Navigation';
import ProfilePacksSection from '../components/ProfilePacksSection';
import PageHeader from '../components/PageHeader';
import { achievements, achievementCategories } from '../data/achievementsData';
import CardBackground from '../components/svg/CardBackground';
import LeftWreath from '../components/svg/LeftWreath';
import RightWreath from '../components/svg/RightWreath';
import PlaceBadge from '../components/svg/PlaceBadge';
import AchievementBackground from '../components/svg/AchievementBackground';
import ProgressIndicator from '../components/svg/ProgressIndicator';
import ProfileCard from '../components/svg/ProfileCard';

type AchievementCategory = typeof achievementCategories[number];

const Profile = () => {
  const [collectionProgress] = useState(55);
  const [currentAchievementCategory, setCurrentAchievementCategory] =
    useState<AchievementCategory>('Teams');

  const currentAchievements =
    achievements[currentAchievementCategory as keyof typeof achievements];

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
    <div className="min-h-screen">
      <PageHeader showBack showSettings />

      <div className="flex flex-col items-center w-full max-w-[420px] mx-auto px-4 space-y-4">
        {/* User Profile Card */}
        <div className="w-full flex justify-center">
          <ProfileCard></ProfileCard>
        </div>
        
        {/* Stats Row */}
        <div className="flex justify-center gap-[10px] w-full max-w-[380px]">
          <div className="relative w-[185px]">
            <CardBackground />
            <div className="absolute inset-0 p-4 flex flex-col">
              <div className="h-[40px] flex items-end justify-center">
                <h3 className="text-white/30 font-semibold text-[17px] mb-1">
                  Collection
                </h3>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-white text-[13px] mb-3 text-center w-full px-2">
                  267 карт в коллекции
                </p>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-4">
                <ProgressIndicator />
              </div>
            </div>
          </div>

          {/* Weekly Rating */}
          <div className="relative w-[185px]">
            <CardBackground />
            <div className="absolute inset-0 p-4 flex flex-col">
              <div className="h-[40px] flex items-end justify-center">
                <h3 className="text-white/30 font-semibold text-[17px] mb-1 text-center">
                  Weekly Rating
                </h3>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 -mt-14">
                  <LeftWreath />
                  <div className="text-[34px] font-bold text-transparent bg-clip-text bg-gradient-to-t to-white from-gray-500">
                    3.97
                  </div>
                  <RightWreath />
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <PlaceBadge place={234} />
              </div>
            </div>
          </div>
        </div>

        {/* Daily Packs Section */}
        <ProfilePacksSection />

        {/* Achievements Section */}
        <div className="relative w-full flex justify-center">
          <AchievementBackground
           achievements={currentAchievements}
           category={currentAchievementCategory}          
           currentAchievementCategory={currentAchievementCategory}  
           switchCategory={switchCategory}
          />
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
