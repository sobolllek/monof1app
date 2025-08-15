import { Gift, RotateCcw, Clock } from "lucide-react";
import dailyPackImage from "@/assets/daily-pack.png";
import rouletteImage from "@/assets/f1-roulette.png";

interface DailyActivityProps {
  availablePacks: number;
  nextPackTime: string;
  rouletteAvailable: boolean;
  nextRouletteTime: string;
  onOpenPack?: () => void;
  onOpenRoulette?: () => void;
}

export const DailyActivity = ({ 
  availablePacks, 
  nextPackTime, 
  rouletteAvailable, 
  nextRouletteTime,
  onOpenPack,
  onOpenRoulette
}: DailyActivityProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Ежедневные активности</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Packs */}
        <div className="daily-highlight">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={dailyPackImage} 
                alt="Daily Pack" 
                className="w-16 h-20 rounded-lg"
              />
              {availablePacks > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {availablePacks}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Gift className="w-4 h-4 text-primary" />
                <h4 className="font-bold">Ежедневные паки</h4>
              </div>
              
              {availablePacks > 0 ? (
                <p className="text-sm text-accent font-medium">
                  Доступно: {availablePacks} пак{availablePacks > 1 ? 'а' : ''}
                </p>
              ) : (
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Следующий: {nextPackTime}</span>
                </div>
              )}
            </div>
            
            <button 
              className={`${availablePacks > 0 ? 'btn-f1-primary' : 'btn-f1-secondary'} py-2 px-4 text-sm`}
              disabled={availablePacks === 0}
              onClick={() => availablePacks > 0 && onOpenPack?.()}
            >
              {availablePacks > 0 ? 'Открыть' : 'Ожидание'}
            </button>
          </div>
        </div>

        {/* Daily Roulette */}
        <div className="daily-highlight">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={rouletteImage} 
                alt="F1 Roulette" 
                className="w-16 h-16 rounded-lg"
              />
              {rouletteAvailable && (
                <div className="absolute inset-0 bg-accent/20 rounded-lg animate-pulse"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <RotateCcw className="w-4 h-4 text-primary" />
                <h4 className="font-bold">Ежедневная рулетка</h4>
              </div>
              
              {rouletteAvailable ? (
                <p className="text-sm text-accent font-medium">
                  Бесплатная попытка доступна!
                </p>
              ) : (
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Следующая: {nextRouletteTime}</span>
                </div>
              )}
            </div>
            
            <button 
              className={`${rouletteAvailable ? 'btn-f1-gold' : 'btn-f1-secondary'} py-2 px-4 text-sm`}
              disabled={!rouletteAvailable}
              onClick={() => rouletteAvailable && onOpenRoulette?.()}
            >
              {rouletteAvailable ? 'Крутить' : 'Ожидание'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};