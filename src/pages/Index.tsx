
import { Bell, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import StatsCard from '../components/StatsCard';
import DailyPacksSection from '../components/DailyPacksSection';
import MyPacksSection from '../components/MyPacksSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12">
        <div>
          <h1 className="text-2xl font-bold text-white">Formula 1 Cards</h1>
          <p className="text-gray-400">Собирайте и торгуйте картами</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/notifications" 
            className="p-2 rounded-lg bg-f1-gray hover:bg-f1-gray-light/50 transition-colors"
          >
            <Bell className="text-white" size={20} />
          </Link>
          <Link 
            to="/profile" 
            className="p-2 rounded-lg bg-f1-gray hover:bg-f1-gray-light/50 transition-colors"
          >
            <User className="text-white" size={20} />
          </Link>
        </div>
      </header>

      <div className="px-4 space-y-6">
        {/* Weekly Rating */}
        <Link 
          to="/rating"
          className="f1-card p-4 flex items-center justify-between hover:bg-f1-gray-light/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-f1-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏆</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Недельный рейтинг</h3>
              <p className="text-gray-400 text-sm">Место #234 • 3.97 ⭐</p>
            </div>
          </div>
          <div className="text-f1-orange">→</div>
        </Link>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard label="Коллекция" value="153 из 300 карт" />
          <StatsCard label="Монеты" value="10,250" />
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
