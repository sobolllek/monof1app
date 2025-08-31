import { useState } from "react";
import { ArrowLeft, Coins, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { toast } from "@/hooks/use-toast";

interface CoinFlipProps {
  userCoins: number;
  userStars: number;
  onCoinsChange: (newCoins: number) => void;
  onBack: () => void;
}

export const CoinFlip = ({ userCoins, userStars, onCoinsChange, onBack }: CoinFlipProps) => {
  const [gameMode, setGameMode] = useState<"bot" | "user" | null>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const flipCoin = () => {
    if (!selectedSide || betAmount <= 0 || betAmount > userCoins) {
      toast({
        title: "Ошибка",
        description: "Выберите сторону и укажите правильную ставку",
        variant: "destructive"
      });
      return;
    }

    setIsFlipping(true);
    setShowResult(false);

    // Simulate coin flip
    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(coinResult);
      setIsFlipping(false);
      
      setTimeout(() => {
        setShowResult(true);
        const won = coinResult === selectedSide;
        
        if (won) {
          onCoinsChange(userCoins + betAmount);
          toast({
            title: "Победа!",
            description: `Вы выиграли ${betAmount} монет!`,
          });
        } else {
          onCoinsChange(userCoins - betAmount);
          toast({
            title: "Поражение",
            description: `Вы потеряли ${betAmount} монет`,
            variant: "destructive"
          });
        }
      }, 1000);
    }, 2000);
  };

  const resetGame = () => {
    setResult(null);
    setShowResult(false);
    setSelectedSide(null);
  };

  if (!gameMode) {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" onClick={onBack} size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg sm:text-2xl font-bold">Монетка</h1>
        </div>
        <CurrencyDisplay coins={userCoins} stars={userStars} />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Card className="card-f1">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 sm:p-3 rounded-full bg-primary/20">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold">Игра с ботом</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Делайте ставки против компьютера
              </p>
            </div>
            <Button 
              onClick={() => setGameMode("bot")}
              className="btn-f1-primary text-xs sm:text-sm px-3 sm:px-4"
              size="sm"
            >
              Играть
            </Button>
          </div>
        </Card>

        <Card className="card-f1">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 sm:p-3 rounded-full bg-accent/20">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold">Игра с игроком</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Играйте против других игроков
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Скоро будет доступно
              </p>
            </div>
            <Button 
              disabled
              className="bg-muted text-muted-foreground text-xs sm:text-sm px-3 sm:px-4"
              size="sm"
            >
              Скоро
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" onClick={() => setGameMode(null)} size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-base sm:text-2xl font-bold">Монетка - {gameMode === "bot" ? "Бот" : "Игрок"}</h1>
        </div>
        <CurrencyDisplay coins={userCoins} stars={userStars} />
      </div>

      <Card className="card-f1">
        <div className="space-y-4 sm:space-y-6">
          {/* Bet Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">Размер ставки</label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                min={1}
                max={userCoins}
                className="flex-1"
                disabled={isFlipping}
              />
              <div className="grid grid-cols-3 sm:flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBetAmount(Math.floor(userCoins * 0.1))}
                  disabled={isFlipping}
                  className="text-xs"
                >
                  10%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBetAmount(Math.floor(userCoins * 0.5))}
                  disabled={isFlipping}
                  className="text-xs"
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBetAmount(userCoins)}
                  disabled={isFlipping}
                  className="text-xs"
                >
                  Все
                </Button>
              </div>
            </div>
          </div>

          {/* Side Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Выберите сторону</label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedSide === "heads" ? "default" : "outline"}
                onClick={() => setSelectedSide("heads")}
                disabled={isFlipping}
                className="h-16 sm:h-20 text-sm sm:text-lg rounded-2xl"
              >
                🪙 Орёл
              </Button>
              <Button
                variant={selectedSide === "tails" ? "default" : "outline"}
                onClick={() => setSelectedSide("tails")}
                disabled={isFlipping}
                className="h-16 sm:h-20 text-sm sm:text-lg rounded-2xl"
              >
                🎯 Решка
              </Button>
            </div>
          </div>

          {/* Coin Animation */}
          <div className="flex justify-center py-4">
            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-accent flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 ${
              isFlipping ? 'animate-spin' : ''
            } ${result && showResult ? (result === "heads" ? 'bg-primary/20 border-primary' : 'bg-accent/20 border-accent') : 'bg-secondary/50'}`}>
              {isFlipping ? (
                <Coins className="w-8 h-8 sm:w-12 sm:h-12 animate-pulse" />
              ) : result && showResult ? (
                result === "heads" ? "🪙" : "🎯"
              ) : (
                <Coins className="w-8 h-8 sm:w-12 sm:h-12" />
              )}
            </div>
          </div>

          {/* Result */}
          {showResult && result && (
            <div className="text-center py-2">
              <div className={`text-lg sm:text-xl font-bold ${
                result === selectedSide ? 'text-primary' : 'text-destructive'
              }`}>
                {result === selectedSide ? 'Победа!' : 'Поражение'}
              </div>
              <div className="text-muted-foreground text-sm">
                Выпало: {result === "heads" ? "Орёл" : "Решка"}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!showResult ? (
              <Button 
                onClick={flipCoin}
                disabled={!selectedSide || betAmount <= 0 || betAmount > userCoins || isFlipping}
                className="w-full btn-f1-primary"
              >
                {isFlipping ? "Подбрасываем..." : "Подбросить монетку"}
              </Button>
            ) : (
              <Button 
                onClick={resetGame}
                className="w-full btn-f1-primary"
              >
                Играть снова
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoinFlip;