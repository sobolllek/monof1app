import { useState } from "react";
import { CodeGame } from "./games/CodeGame";
import { RacingSapper } from "./games/RacingSapper";
import { CoinFlip } from "./games/CoinFlip";
import { CodeBreakerGame } from "./games/CodeBreakerGame";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Code, Bomb, Coins, ArrowLeft, Mail } from "lucide-react";

interface GamesPageProps {
  userCoins: number;
  userStars: number;
  onCoinsChange: (newCoins: number) => void;
  onBackToGames?: () => void;
}

export const GamesPage = ({ userCoins, userStars, onCoinsChange, onBackToGames }: GamesPageProps) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  if (currentGame === "code") {
    return (
      <CodeGame 
        userCoins={userCoins}
        onCoinsChange={onCoinsChange}
        onBack={() => setCurrentGame(null)}
      />
    );
  }

  if (currentGame === "sapper") {
    return (
      <RacingSapper 
        userCoins={userCoins}
        onCoinsChange={onCoinsChange}
        onBack={() => setCurrentGame(null)}
      />
    );
  }

  if (currentGame === "coinflip") {
    return (
      <CoinFlip 
        userCoins={userCoins}
        userStars={userStars}
        onCoinsChange={onCoinsChange}
        onBack={() => setCurrentGame(null)}
      />
    );
  }

  if (currentGame === "code-breaker") {
    return (
      <CodeBreakerGame 
        userCoins={userCoins}
        onCoinsChange={onCoinsChange}
        onBack={() => setCurrentGame(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header with currency */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Игры</h1>
        <CurrencyDisplay coins={userCoins} stars={userStars} />
      </div>

      {/* Games list */}
      <div className="space-y-4">
        {/* Daily Code Game */}
        <Card className="card-f1 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Ежедневный код</h3>
              <p className="text-muted-foreground text-sm">
                Отгадай 4-значный код, отвечая на вопросы по Формуле 1
              </p>
              <p className="text-xs text-primary mt-1">
                3 бесплатные попытки, далее за монеты
              </p>
            </div>
            <Button 
              onClick={() => setCurrentGame("code")}
              className="bg-primary hover:bg-primary/90"
            >
              Играть
            </Button>
          </div>
        </Card>

        {/* Racing Sapper */}
        <Card className="card-f1 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Bomb className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Гоночный сапёр</h3>
              <p className="text-muted-foreground text-sm">
                Сапёр с гоночной тематикой. Делай ставки и выигрывай!
              </p>
              <p className="text-xs text-accent mt-1">
                3 уровня сложности с разными коэффициентами
              </p>
            </div>
            <Button 
              onClick={() => setCurrentGame("sapper")}
              className="bg-accent hover:bg-accent/90"
            >
              Играть
            </Button>
          </div>
        </Card>

        {/* Coin Flip */}
        <Card className="card-f1 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-500/20">
              <Coins className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Монетка</h3>
              <p className="text-muted-foreground text-sm">
                Орёл или решка? Делай ставки и проверяй удачу!
              </p>
              <p className="text-xs text-yellow-500 mt-1">
                Игра с ботом или другими игроками
              </p>
            </div>
            <Button 
              onClick={() => setCurrentGame("coinflip")}
              className="bg-yellow-500 hover:bg-yellow-500/90 text-black"
            >
              Играть
            </Button>
          </div>
        </Card>

        {/* Code Breaker Game */}
        <Card className="card-f1 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Mail className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">F1 SECRET: CODE BREAKER</h3>
              <p className="text-muted-foreground text-sm">
                Взломайте секретный конверт за 6 попыток
              </p>
              <p className="text-xs text-purple-500 mt-1">
                Угадайте 6-значный код с подсказками
              </p>
            </div>
            <Button 
              onClick={() => setCurrentGame("code-breaker")}
              className="bg-purple-500 hover:bg-purple-500/90"
            >
              Играть
            </Button>
          </div>
        </Card>
      </div>

      {/* Back button if callback provided */}
      {onBackToGames && (
        <Button 
          variant="outline" 
          onClick={onBackToGames}
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к главному меню
        </Button>
      )}
    </div>
  );
};