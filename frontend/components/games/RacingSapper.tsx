import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowLeft, Bomb, Flag, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RacingSapperProps {
  userCoins: number;
  onCoinsChange: (newCoins: number) => void;
  onBack: () => void;
}

type Difficulty = "easy" | "medium" | "hard";
type CellState = "hidden" | "revealed" | "flagged" | "bomb";

interface GameConfig {
  size: number;
  bombs: number;
  multiplier: number;
  minBet: number;
}

const DIFFICULTIES: Record<Difficulty, GameConfig> = {
  easy: { size: 8, bombs: 10, multiplier: 1.5, minBet: 50 },
  medium: { size: 10, bombs: 20, multiplier: 2.0, minBet: 100 },
  hard: { size: 12, bombs: 35, multiplier: 3.0, minBet: 200 }
};

export const RacingSapper = ({ userCoins, onCoinsChange, onBack }: RacingSapperProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [bet, setBet] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameBoard, setGameBoard] = useState<CellState[][]>([]);
  const [bombPositions, setBombPositions] = useState<Set<string>>(new Set());
  const [revealedCount, setRevealedCount] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const { toast } = useToast();

  const config = DIFFICULTIES[difficulty];

  const initializeGame = () => {
    const board: CellState[][] = Array(config.size)
      .fill(null)
      .map(() => Array(config.size).fill("hidden"));
    
    // Generate bomb positions
    const bombs = new Set<string>();
    while (bombs.size < config.bombs) {
      const row = Math.floor(Math.random() * config.size);
      const col = Math.floor(Math.random() * config.size);
      bombs.add(`${row}-${col}`);
    }

    setGameBoard(board);
    setBombPositions(bombs);
    setRevealedCount(0);
    setGameState("playing");
    setGameStarted(true);
  };

  const startGame = () => {
    if (bet < config.minBet) {
      toast({
        title: "Ставка слишком мала",
        description: `Минимальная ставка: ${config.minBet} монет`,
        variant: "destructive",
      });
      return;
    }

    if (bet > userCoins) {
      toast({
        title: "Недостаточно монет",
        description: "У вас недостаточно монет для этой ставки",
        variant: "destructive",
      });
      return;
    }

    onCoinsChange(userCoins - bet);
    initializeGame();
  };

  const revealCell = (row: number, col: number) => {
    if (gameState !== "playing" || gameBoard[row][col] !== "hidden") return;

    const key = `${row}-${col}`;
    if (bombPositions.has(key)) {
      // Hit a bomb - game over
      const newBoard = [...gameBoard];
      newBoard[row][col] = "bomb";
      setGameBoard(newBoard);
      setGameState("lost");
      toast({
        title: "Взрыв!",
        description: "Вы наткнулись на бомбу. Ставка проиграна.",
        variant: "destructive",
      });
      return;
    }

    // Safe cell
    const newBoard = [...gameBoard];
    newBoard[row][col] = "revealed";
    setGameBoard(newBoard);
    
    const newRevealedCount = revealedCount + 1;
    setRevealedCount(newRevealedCount);

    // Check win condition
    const totalSafeCells = config.size * config.size - config.bombs;
    if (newRevealedCount >= totalSafeCells) {
      setGameState("won");
      const winnings = Math.floor(bet * config.multiplier);
      onCoinsChange(userCoins + winnings);
      toast({
        title: "Победа!",
        description: `Вы выиграли ${winnings} монет!`,
      });
    }
  };

  const cashOut = () => {
    if (gameState !== "playing" || revealedCount === 0) return;

    const safeCells = config.size * config.size - config.bombs;
    const progress = revealedCount / safeCells;
    const cashOutMultiplier = 1 + (config.multiplier - 1) * progress * 0.8;
    const winnings = Math.floor(bet * cashOutMultiplier);
    
    onCoinsChange(userCoins + winnings);
    setGameState("won");
    toast({
      title: "Забрали выигрыш!",
      description: `Вы получили ${winnings} монет`,
    });
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameState("playing");
    setRevealedCount(0);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Гоночный сапёр</h1>
        </div>

        {/* Difficulty selection */}
        <Card className="card-f1 p-6">
          <h3 className="text-lg font-bold mb-4">Выберите сложность</h3>
          <div className="grid grid-cols-1 gap-4">
            {(Object.keys(DIFFICULTIES) as Difficulty[]).map((diff) => {
              const cfg = DIFFICULTIES[diff];
              return (
                <Button
                  key={diff}
                  variant={difficulty === diff ? "default" : "outline"}
                  onClick={() => setDifficulty(diff)}
                  className="p-4 h-auto flex flex-col items-start"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold capitalize">
                      {diff === "easy" ? "Легко" : diff === "medium" ? "Средне" : "Сложно"}
                    </span>
                    <span className="text-primary">x{cfg.multiplier}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {cfg.size}x{cfg.size}, {cfg.bombs} бомб, мин. ставка: {cfg.minBet}
                  </span>
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Bet amount */}
        <Card className="card-f1 p-6">
          <h3 className="text-lg font-bold mb-4">Размер ставки</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                min={config.minBet}
                max={userCoins}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">монет</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Мин: {config.minBet}</span>
              <span>Макс: {userCoins}</span>
            </div>
            <div className="text-center">
              <p className="text-sm text-primary">
                Возможный выигрыш: {Math.floor(bet * config.multiplier)} монет
              </p>
            </div>
          </div>
        </Card>

        <Button onClick={startGame} className="w-full" size="lg">
          Начать игру
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={resetGame}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Ставка: {bet}</p>
          <p className="text-sm text-primary">
            Открыто: {revealedCount}/{config.size * config.size - config.bombs}
          </p>
        </div>
      </div>

      {/* Game board */}
      <div className="flex justify-center">
        <div 
          className="grid gap-1 p-4 bg-muted rounded-lg"
          style={{ gridTemplateColumns: `repeat(${config.size}, 1fr)` }}
        >
          {gameBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Button
                key={`${rowIndex}-${colIndex}`}
                variant={cell === "revealed" ? "secondary" : "outline"}
                className={`
                  w-8 h-8 p-0 text-xs
                  ${cell === "bomb" ? "bg-destructive text-destructive-foreground" : ""}
                  ${cell === "revealed" ? "bg-primary/20" : ""}
                `}
                onClick={() => revealCell(rowIndex, colIndex)}
                disabled={gameState !== "playing" || cell !== "hidden"}
              >
                {cell === "revealed" && <Flag className="w-3 h-3" />}
                {cell === "bomb" && <Bomb className="w-3 h-3" />}
              </Button>
            ))
          )}
        </div>
      </div>

      {/* Game controls */}
      {gameState === "playing" && revealedCount > 0 && (
        <Card className="card-f1 p-4 text-center">
          <Button onClick={cashOut} variant="secondary" className="w-full">
            <Trophy className="w-4 h-4 mr-2" />
            Забрать выигрыш ({Math.floor(bet * (1 + (config.multiplier - 1) * (revealedCount / (config.size * config.size - config.bombs)) * 0.8))} монет)
          </Button>
        </Card>
      )}

      {/* Game result */}
      {gameState !== "playing" && (
        <Card className="card-f1 p-6 text-center">
          {gameState === "won" ? (
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          ) : (
            <Bomb className="w-16 h-16 text-destructive mx-auto mb-4" />
          )}
          <h3 className="text-xl font-bold mb-2">
            {gameState === "won" ? "Победа!" : "Поражение!"}
          </h3>
          <Button onClick={resetGame} className="mt-4">
            Играть снова
          </Button>
        </Card>
      )}
    </div>
  );
};

export default RacingSapper;