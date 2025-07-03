
import { useState, useEffect } from 'react';
import { Zap, Trophy, Package, Star, Users, TrendingUp, User, Bell } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import DailyPacksSection from '../components/DailyPacksSection';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    { icon: Package, label: "Карты", value: "267", color: "text-f1-red" },
    { icon: Zap, label: "Энергия", value: "85%", color: "text-f1-orange" },
    { icon: Trophy, label: "Рейтинг", value: "#234", color: "text-yellow-400" },
    { icon: Users, label: "Обмены", value: "153", color: "text-green-400" },
  ];

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-f1-gray/95 backdrop-blur-lg border-b border-f1-gray-light/50 z-40">
        <div className="p-4 pt-28">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Mono F1</h1>
              <p className="text-gray-400">
                {currentTime.toLocaleDateString('ru-RU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/profile" className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                <User className="text-gray-400 hover:text-white" size={20} />
              </Link>
              <Link to="/notifications" className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors relative">
                <Bell className="text-gray-400 hover:text-white" size={20} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-f1-red rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">4</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="pt-32 p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="f1-card p-4 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3">
                <stat.icon className={`${stat.color}`} size={24} />
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Packs Section */}
        <div className="mb-8">
          <DailyPacksSection />
        </div>

        {/* Ежедневные активности */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold">Ежедневные активности</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Link 
              to="/daily-roulette"
              className="f1-card p-4 text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="w-12 h-12 bg-f1-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎰</span>
              </div>
              <h4 className="font-semibold mb-1">Рулетка</h4>
              <p className="text-sm text-gray-400">Ежедневные призы</p>
            </Link>
            
            <div className="f1-card p-4 text-center opacity-50">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-1">Задания</h4>
              <p className="text-sm text-gray-400">Скоро</p>
            </div>
          </div>
        </div>

        {/* Weekly Rating */}
        <div className="f1-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-f1-orange" size={24} />
            <div>
              <h3 className="text-white font-semibold">Недельный рейтинг</h3>
              <p className="text-gray-400 text-sm">Место #234 • 3.97 ⭐</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-f1-orange">↗</div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
