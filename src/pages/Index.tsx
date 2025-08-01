import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import StatsCard from '../components/StatsCard';
import DailyPacksSection from '../components/DailyPacksSection';
import MyPacksSection from '../components/MyPacksSection';
import PageHeader from '../components/PageHeader';

const Index = () => {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <PageHeader 
        title="Mono F1" 
        showNotifications
        showProfile
      />
      <div className="px-4 space-y-6 pt-32">
  {/* Рейтинг - 4K качество */}
  <Link 
    to="/rating"
    className="block relative aspect-[183/111] w-full rounded-[22px] overflow-hidden"
  >
    {/* Оптимизированный SVG фон */}
    <svg 
      viewBox="0 0 183 111" 
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      shape-rendering="crispEdges"
    >
      <image 
        href="/svg/rating-bg.svg" 
        width="183" 
        height="111"
        preserveAspectRatio="xMidYMid slice"
        image-rendering="optimizeQuality"
      />
    </svg>
    
    {/* Текст с четким рендерингом */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-white font-bold text-[min(12vw,114px)] subpixel-antialiased">5.00</span>
    </div>
  </Link>

  {/* Stats Grid */}
  <div className="grid grid-cols-2 gap-4">
    <StatsCard label="Коллекция" value="153 из 300 карт" />
    
    {/* Монеты с улучшенным качеством */}
    <div className="relative aspect-[183/111] rounded-[22px] overflow-hidden">
      <svg 
        viewBox="0 0 183 111" 
        className="w-full h-full"
        shape-rendering="geometricPrecision"
      >
        <image 
          href="/svg/coins-bg.svg" 
          width="183" 
          height="111"
          preserveAspectRatio="xMidYMid slice"
          image-rendering="optimizeQuality"
        />
      </svg>
      <div className="absolute top-[5%] right-[5%]">
        <span className="text-white font-bold text-[min(4vw,24px)] subpixel-antialiased">10,250</span>
      </div>
    </div>
  </div>




        {/* My Packs Section */}
        <MyPacksSection />

        {/* Daily Packs */}
        <DailyPacksSection />
        
        {/* Daily Roulette */}
        <Link 
          to="/daily-roulette"
          className="f1-card p-4 flex items-center justify-between hover:bg-f1-gray-light/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎰</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Ежедневная рулетка</h3>
              <p className="text-gray-400 text-sm">Попробуй удачу и получи приз!</p>
            </div>
          </div>
          <div className="text-f1-orange">→</div>
        </Link>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
