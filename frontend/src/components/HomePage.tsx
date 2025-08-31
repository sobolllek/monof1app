import { useState } from "react";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { DailyActivity } from "./DailyActivity";
import AchievementCard from "./AchievementCard";
import { Activity, Zap, TrendingUp } from "lucide-react";

// Mock data
const mockAchievements = [
  {
    id: "1",
    title: "Первый коллекционер",
    description: "Соберите 10 карт в свою коллекцию",
    progress: 7,
    maxProgress: 10,
    completed: false,
    reward: { type: 'coins' as const, amount: 1000 }
  },
  {
    id: "2", 
    title: "Торговец",
    description: "Совершите 5 успешных сделок",
    progress: 3,
    maxProgress: 5,
    completed: false,
    reward: { type: 'stars' as const, amount: 10 }
  },
  {
    id: "3",
    title: "Удачливый игрок",
    description: "Выиграйте в рулетке 3 раза",
    progress: 3,
    maxProgress: 3,
    completed: true,
    reward: { type: 'pack' as const, amount: 1 }
  }
];

const recentEvents = [
  { id: 1, type: "pack", message: "Открыли ежедневный пак", time: "2 мин назад" },
  { id: 2, type: "win", message: "Выиграли 500 монет в рулетке", time: "1 час назад" },
  { id: 3, type: "trade", message: "Продали карту Hamilton за 1200 монет", time: "3 часа назад" },
  { id: 4, type: "rare", message: "Получили редкую карту Verstappen!", time: "1 день назад" },
];

interface HomePageProps {
  onOpenPack?: () => void;
  onOpenRoulette?: () => void;
  userCoins?: number;
  userStars?: number;
}

export const HomePage = ({ onOpenPack, onOpenRoulette, userCoins = 15420, userStars = 25 }: HomePageProps) => {

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* User Stats */}
      <div className="card-f1-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Добро пожаловать!</h2>
            <p className="text-muted-foreground">Ваша статистика</p>
          </div>
          <CurrencyDisplay coins={userCoins} stars={userStars} />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">127</div>
            <div className="text-xs text-muted-foreground">Карт собрано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">8</div>
            <div className="text-xs text-muted-foreground">Активных лотов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">340</div>
            <div className="text-xs text-muted-foreground">Место в рейтинге</div>
          </div>
        </div>
      </div>

      {/* Daily Activities */}
      <DailyActivity
        availablePacks={2}
        nextPackTime="14:30"
        rouletteAvailable={true}
        nextRouletteTime="завтра в 00:00"
        onOpenPack={onOpenPack}
        onOpenRoulette={onOpenRoulette}
      />

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Достижения</h3>
        <div className="space-y-3">
          {mockAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Последние события</h3>
        <div className="card-f1 space-y-3">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-full bg-muted">
                {event.type === 'pack' && <Activity className="w-4 h-4 text-primary" />}
                {event.type === 'win' && <Zap className="w-4 h-4 text-accent" />}
                {event.type === 'trade' && <TrendingUp className="w-4 h-4 text-blue-400" />}
                {event.type === 'rare' && <Activity className="w-4 h-4 text-primary animate-pulse" />}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium">{event.message}</p>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};