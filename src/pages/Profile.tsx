import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import ProfilePacksSection from '../components/ProfilePacksSection';
import PageHeader from '../components/PageHeader';

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
    <div className="min-h-screen pb-20 font-inter">
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
          <div className="relative">
            <svg 
              width="100%" 
              height="183" 
              viewBox="0 0 183 183" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-2xl"
            >
              <rect width="183" height="183" rx="22" fill="black" fill-opacity="0.4"/>
              <rect x="0.75" y="0.75" width="181.5" height="181.5" rx="21.25" stroke="url(#paint0_linear_397_1334)" stroke-opacity="0.3" stroke-width="1.5"/>
              <defs>
                <linearGradient id="paint0_linear_397_1334" x1="91.5" y1="0" x2="91.5" y2="183" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B8B8B8"/>
                  <stop offset="1" stopColor="#404040"/>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Text overlay */}
            <div className="absolute inset-0 p-4 flex flex-col items-start text-left">
              <h3 className="text-white/30 font-semibold mb-2 mt-2">Collection</h3>
              <p className="text-white text-[12px] mb-4 -mt-2">267 карт в коллекции</p>
              
              {/* Progress indicators */}
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Rating */}
          <div className="relative">
            <svg 
              width="100%" 
              height="183" 
              viewBox="0 0 183 183" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-2xl"
            >
              <rect width="183" height="183" rx="22" fill="black" fill-opacity="0.4"/>
              <rect x="0.75" y="0.75" width="181.5" height="181.5" rx="21.25" stroke="url(#paint0_linear_397_1334)" stroke-opacity="0.3" stroke-width="1.5"/>
              <defs>
                <linearGradient id="paint0_linear_397_1334" x1="91.5" y1="0" x2="91.5" y2="183" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B8B8B8"/>
                  <stop offset="1" stopColor="#404040"/>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Text overlay */}
           <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
             <h3 className="text-white/30 font-semibold mb-2 -mt-14">Weekly Rating</h3>
             <div className="flex items-center justify-center gap-2 mt-2 mb-2">
               {/* Левый венок */}
               <svg width="16" height="33" viewBox="0 0 16 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#373737]">
               <path d="M6.96223 30.6489C9.56757 29.4252 11.9737 30.0964 13.5229 32.2421C10.5921 33.6187 8.29665 33.1386 6.96223 30.6489Z" fill="currentColor"/>
               <path d="M14.1929 25.0718C16.4648 26.8707 16.4244 29.0721 14.3069 31.4161C12.4429 29.5025 12.3107 27.1552 14.1929 25.0718Z" fill="currentColor"/>
               <path d="M2.6096 25.0193C5.44002 24.3671 7.62767 25.5212 8.6298 27.9353C5.44559 28.6689 3.32078 27.7242 2.6096 25.0193Z" fill="currentColor"/>
               <path d="M11.3124 21.4901C12.9674 23.8051 12.2809 25.9111 9.55575 27.6187C8.32646 25.2986 8.89002 23.0079 11.3124 21.4901Z" fill="currentColor"/>
               <path d="M0.0870682 19.1023C2.96925 19.5091 4.52195 21.3567 4.46585 23.9461C1.2232 23.4885 -0.356469 21.8569 0.0870682 19.1023Z" fill="currentColor"/>
               <path d="M9.87706 18.7519C10.3464 21.5027 8.78244 23.147 5.54435 23.6313C5.46397 21.0426 6.9989 19.1825 9.87706 18.7519Z" fill="currentColor"/>
               <path d="M10.2613 13.7298C10.2613 16.5155 8.43943 17.9084 5.16015 17.9084C5.51696 15.3401 7.34636 13.7298 10.2613 13.7298Z" fill="currentColor"/>
               <path d="M0.389075 11.9389C3.10882 12.9203 4.19722 15.0386 3.54364 17.5551C0.483824 16.451 -0.681031 14.5383 0.389075 11.9389Z" fill="currentColor"/>
               <path d="M5.16015 12.2462C6.49577 9.9781 8.82745 9.10621 11.5403 10.1044C10.4517 12.6969 8.21206 13.3691 5.16015 12.2462Z" fill="currentColor"/>
               <path d="M3.47016 4.90966C5.64362 6.72807 5.86163 9.07028 4.29959 11.2079C1.85444 9.1622 1.48733 6.98681 3.47016 4.90966Z" fill="currentColor"/>
               <path d="M8.34834 7.87457C9.94374 5.75873 12.3644 5.13369 14.9427 6.40669C13.5545 8.8706 11.2489 9.30668 8.34834 7.87457Z" fill="currentColor"/>
               <path d="M7.75305 0.596947C10.056 2.36096 10.0537 4.56348 7.97722 6.93951C6.07986 5.05462 5.90723 2.70901 7.75305 0.596947Z" fill="currentColor"/>
               <path d="M16 0C16 2.78575 14.1782 4.17863 10.8989 4.17863C11.2557 1.6103 13.0851 1.35212e-05 16 0Z" fill="currentColor"/>
             </svg>
    
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-t to-white from-gray-500">3.97</div>
    
            {/* Правый венок */}
             <svg width="16" height="33" viewBox="0 0 16 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#373737] transform scale-x-[-1]">
               <path d="M6.96223 30.6489C9.56757 29.4252 11.9737 30.0964 13.5229 32.2421C10.5921 33.6187 8.29665 33.1386 6.96223 30.6489Z" fill="currentColor"/>
               <path d="M14.1929 25.0718C16.4648 26.8707 16.4244 29.0721 14.3069 31.4161C12.4429 29.5025 12.3107 27.1552 14.1929 25.0718Z" fill="currentColor"/>
               <path d="M2.6096 25.0193C5.44002 24.3671 7.62767 25.5212 8.6298 27.9353C5.44559 28.6689 3.32078 27.7242 2.6096 25.0193Z" fill="currentColor"/>
               <path d="M11.3124 21.4901C12.9674 23.8051 12.2809 25.9111 9.55575 27.6187C8.32646 25.2986 8.89002 23.0079 11.3124 21.4901Z" fill="currentColor"/>
               <path d="M0.0870682 19.1023C2.96925 19.5091 4.52195 21.3567 4.46585 23.9461C1.2232 23.4885 -0.356469 21.8569 0.0870682 19.1023Z" fill="currentColor"/>
               <path d="M9.87706 18.7519C10.3464 21.5027 8.78244 23.147 5.54435 23.6313C5.46397 21.0426 6.9989 19.1825 9.87706 18.7519Z" fill="currentColor"/>
               <path d="M10.2613 13.7298C10.2613 16.5155 8.43943 17.9084 5.16015 17.9084C5.51696 15.3401 7.34636 13.7298 10.2613 13.7298Z" fill="currentColor"/>
               <path d="M0.389075 11.9389C3.10882 12.9203 4.19722 15.0386 3.54364 17.5551C0.483824 16.451 -0.681031 14.5383 0.389075 11.9389Z" fill="currentColor"/>
               <path d="M5.16015 12.2462C6.49577 9.9781 8.82745 9.10621 11.5403 10.1044C10.4517 12.6969 8.21206 13.3691 5.16015 12.2462Z" fill="currentColor"/>
               <path d="M3.47016 4.90966C5.64362 6.72807 5.86163 9.07028 4.29959 11.2079C1.85444 9.1622 1.48733 6.98681 3.47016 4.90966Z" fill="currentColor"/>
               <path d="M8.34834 7.87457C9.94374 5.75873 12.3644 5.13369 14.9427 6.40669C13.5545 8.8706 11.2489 9.30668 8.34834 7.87457Z" fill="currentColor"/>
               <path d="M7.75305 0.596947C10.056 2.36096 10.0537 4.56348 7.97722 6.93951C6.07986 5.05462 5.90723 2.70901 7.75305 0.596947Z" fill="currentColor"/>
               <path d="M16 0C16 2.78575 14.1782 4.17863 10.8989 4.17863C11.2557 1.6103 13.0851 1.35212e-05 16 0Z" fill="currentColor"/>
               </svg>
            </div>
           </div>
              {/* SVG "Место: #234" внизу */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <div className="relative w-[148px] h-[38px]">
                <svg 
                 className="absolute top-0 left-0 w-full h-full" 
                 viewBox="0 0 148 42" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg"
                >
               <rect x="0.5" y="0.5" width="147" height="41" rx="9.5" fill="#171717" stroke="url(#paint0_linear_250_1651)" />
             <defs>
             <linearGradient id="paint0_linear_250_1651" x1="74" y1="0" x2="74" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#383838"/> 
              <stop offset="1" stopColor="#131313"/>
             </linearGradient>
              </defs>
              </svg>
                <div className="absolute inset-0 flex items-center justify-between px-4 text-sm w-full">
                   <span className="text-white/20">Место:</span>
                   <span className="text-white font-semibold font-fira">#234</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Packs Section */}
        <ProfilePacksSection />

        {/* Achievements */}
        <div className="relative">
          <svg 
            width="100%" 
            height="272" 
            viewBox="0 0 378 272" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-2xl"
          >
            <rect width="378" height="272" rx="22" fill="black" fill-opacity="0.4"/>
            <rect x="0.75" y="0.75" width="376.5" height="270.5" rx="21.25" stroke="url(#paint0_linear_400_1344)" stroke-opacity="0.3" stroke-width="1.5"/>
            <defs>
              <linearGradient id="paint0_linear_400_1344" x1="189" y1="0" x2="189" y2="272" gradientUnits="userSpaceOnUse">
                <stop stopColor="#B8B8B8"/>
                <stop offset="1" stopColor="#404040"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Text overlay */}
          <div className="absolute inset-0 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/30 font-semibold mb-2 mt-2 -ml-2">Achievements</h3>
              <div className="ml-auto flex items-center gap-[2px] text-sm text-gray-400">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchCategory('prev')}
                  className="p-1 hover:bg-gray-800/50"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="min-w-[80px] text-center font-formulaDisplay font-black">{currentAchievementCategory}</span>
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
            
            <div className="space-y-3 overflow-y-auto flex-1">
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
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
