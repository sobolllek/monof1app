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
  {/* Рейтинг - гарантированно рабочий вариант */}
  <Link 
    to="/rating"
    className="block relative h-[111px] w-full rounded-[22px] overflow-hidden bg-gray-900"
  >
    {/* 1. Альтернатива: используем div с фоновым изображением */}
    <div 
      className="absolute inset-0 bg-[url('/svg/rating-bg.svg')] bg-cover bg-center"
        style={{
          imageRendering: 'crisp-edges',
          WebkitFontSmoothing: 'antialiased'
        }}
    />
    
    {/* 2. Текст поверх */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-white font-bold text-6xl drop-shadow-lg">5.00</span>
    </div>
  </Link>

  {/* Монеты - аналогичное решение */}
  <div className="grid grid-cols-2 gap-4">
    <StatsCard label="Коллекция" value="153 из 300 карт" />
    
    <div className="relative h-[111px] rounded-[22px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('/svg/coins-bg.svg')] bg-cover bg-center"
        style={{
          imageRendering: 'pixelated',
          WebkitFontSmoothing: 'antialiased'
        }}
      />
      <span className="absolute top-3 right-3 text-white font-bold text-lg backdrop-blur-sm">10,250</span>
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
