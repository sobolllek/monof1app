import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowLeft, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeGameProps {
  userCoins: number;
  onCoinsChange: (newCoins: number) => void;
  onBack: () => void;
}

const F1_QUESTIONS = [
  {
    question: "Сколько гонок в сезоне 2024 года?",
    answer: "24",
    hint: "Больше 20, но меньше 25"
  },
  {
    question: "Какой номер у Макса Ферстаппена?",
    answer: "1",
    hint: "Номер чемпиона мира"
  },
  {
    question: "Сколько очков дают за победу в гонке?",
    answer: "25",
    hint: "Четверть от ста"
  },
  {
    question: "В каком году была основана команда Ferrari?",
    answer: "1950",
    hint: "Начало 50-х годов прошлого века"
  },
  {
    question: "Сколько кругов в гонке в Монако?",
    answer: "78",
    hint: "Почти 80"
  },
  {
    question: "Какой номер у Льюиса Хэмилтона?",
    answer: "44",
    hint: "Два одинаковых числа подряд"
  }
];

export const CodeGame = ({ userCoins, onCoinsChange, onBack }: CodeGameProps) => {
  const [todaysCode, setTodaysCode] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [showHint, setShowHint] = useState(false);
  const [guessedDigits, setGuessedDigits] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Generate today's code based on date
    const today = new Date().toDateString();
    const hash = today.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const code = Math.abs(hash % 10000).toString().padStart(4, '0');
    setTodaysCode(code);
  }, []);

  const currentQuestion = F1_QUESTIONS[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (userAnswer === currentQuestion.answer) {
      const newDigits = [...guessedDigits, todaysCode[currentQuestionIndex]];
      setGuessedDigits(newDigits);
      
      if (newDigits.length === 4) {
        setGameState("won");
        const reward = 1000;
        onCoinsChange(userCoins + reward);
        toast({
          title: "Поздравляем!",
          description: `Вы отгадали код и получили ${reward} монет!`,
        });
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer("");
        setShowHint(false);
        toast({
          title: "Правильно!",
          description: "Вы отгадали цифру кода!",
        });
      }
    } else {
      setAttempts(prev => prev - 1);
      if (attempts <= 1) {
        if (userCoins >= 100) {
          onCoinsChange(userCoins - 100);
          setAttempts(3);
          toast({
            title: "Попытки закончились",
            description: "Потрачено 100 монет за дополнительные попытки",
          });
        } else {
          setGameState("lost");
          toast({
            title: "Игра окончена",
            description: "У вас недостаточно монет для продолжения",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Неправильно",
          description: `Осталось попыток: ${attempts - 1}`,
          variant: "destructive",
        });
      }
      setUserAnswer("");
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setAttempts(3);
    setGameState("playing");
    setShowHint(false);
    setGuessedDigits([]);
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">Ежедневный код</h1>
      </div>

      {/* Code display */}
      <Card className="card-f1 p-6">
        <h3 className="text-lg font-bold mb-4 text-center">Код дня</h3>
        <div className="flex justify-center space-x-2 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-12 h-12 border-2 border-primary/30 rounded-lg flex items-center justify-center text-xl font-bold"
            >
              {guessedDigits[index] || "?"}
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm">
          Отгадайте 4-значный код, отвечая на вопросы
        </p>
      </Card>

      {gameState === "playing" && (
        <Card className="card-f1 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold">Вопрос {currentQuestionIndex + 1}/4</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Попыток: {attempts}
                </span>
                {attempts === 0 && userCoins >= 100 && (
                  <span className="text-xs text-accent">
                    (100 монет за 3 попытки)
                  </span>
                )}
              </div>
            </div>

            <p className="text-lg">{currentQuestion.question}</p>

            <div className="flex space-x-2">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Ваш ответ"
                className="flex-1"
              />
              <Button onClick={handleSubmitAnswer} disabled={!userAnswer}>
                <CheckCircle className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                size="sm"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Подсказка
              </Button>
              {showHint && (
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.hint}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {gameState === "won" && (
        <Card className="card-f1-glow p-6 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Поздравляем!</h3>
          <p className="text-muted-foreground mb-4">
            Вы успешно отгадали весь код: {todaysCode}
          </p>
          <Button onClick={resetGame}>
            Играть снова завтра
          </Button>
        </Card>
      )}

      {gameState === "lost" && (
        <Card className="card-f1 p-6 text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Игра окончена</h3>
          <p className="text-muted-foreground mb-4">
            У вас недостаточно монет для продолжения
          </p>
          <Button onClick={resetGame}>
            Попробовать завтра
          </Button>
        </Card>
      )}
    </div>
  );
};