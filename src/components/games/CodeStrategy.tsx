import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeStrategyProps {
  userCoins?: number;
  onCoinsChange?: (newCoins: number) => void;
}

type CellStatus = 'hot-lap' | 'pit-hint' | 'dnf' | 'empty';

interface GuessResult {
  digit: string;
  status: CellStatus;
}

interface Attempt {
  guess: string;
  results: GuessResult[];
}

export const CodeStrategy = ({
  userCoins = 0,
  onCoinsChange = () => {}
}: CodeStrategyProps) => {
  const [secretCode] = useState(() =>
    Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('')
  );

  const [currentGuess, setCurrentGuess] = useState('');
  const [currentResults, setCurrentResults] = useState<GuessResult[]>(
    Array.from({ length: 6 }, () => ({ digit: '', status: 'empty' }))
  );
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'success' | 'failed'>(
    'closed'
  );
  const [buyAttemptCost, setBuyAttemptCost] = useState(100);

  const { toast } = useToast();

  const checkGuess = (guess: string): GuessResult[] => {
    const secretDigits = secretCode.split('');
    const guessDigits = guess.split('');

    return guessDigits.map((digit, i) => {
      if (digit === secretDigits[i]) return { digit, status: 'hot-lap' };
      if (secretDigits.includes(digit)) return { digit, status: 'pit-hint' };
      return { digit, status: 'dnf' };
    });
  };

  const processGuess = (guess: string) => {
    const results = checkGuess(guess);
    const newAttempt: Attempt = { guess, results };
    setAttempts((prev) => [...prev, newAttempt]);

    const isWin = results.every((r) => r.status === 'hot-lap');

    if (isWin) {
      setGameStatus('won');
      setEnvelopeState('success');
      const reward = 500;
      onCoinsChange(userCoins + reward);
      toast({
        title: 'ПОБЕДА! 🏆',
        description: `Конверт взломан! +${reward} монет`
      });
    } else {
      const newRemainingAttempts = remainingAttempts - 1;
      setRemainingAttempts(newRemainingAttempts);

      if (newRemainingAttempts === 0) {
        setGameStatus('lost');
        setEnvelopeState('failed');
      } else {
        setEnvelopeState('closed');
      }
    }

    setCurrentGuess('');
    setCurrentResults(Array.from({ length: 6 }, () => ({ digit: '', status: 'empty' })));

    // вернуть фокус на первую ячейку
    requestAnimationFrame(() => {
      const firstInput = document.querySelector<HTMLInputElement>(
        `input[data-index="0"]`
      );
      firstInput?.focus();
    });
  };

  const handleBuyAttempt = () => {
    if (userCoins < buyAttemptCost) {
      toast({
        title: 'Недостаточно монет',
        description: `Нужно ${buyAttemptCost} монет`,
        variant: 'destructive'
      });
      return;
    }

    onCoinsChange(userCoins - buyAttemptCost);
    setRemainingAttempts((prev) => prev + 1);
    setBuyAttemptCost((prev) => Math.floor(prev * 1.5));
    setGameStatus('playing');
    setEnvelopeState('closed');

    toast({
      title: 'Куплена попытка!',
      description: `Следующая попытка: ${Math.floor(buyAttemptCost * 1.5)} монет`
    });
  };

  const resetGame = () => {
    setCurrentGuess('');
    setCurrentResults(Array.from({ length: 6 }, () => ({ digit: '', status: 'empty' })));
    setAttempts([]);
    setRemainingAttempts(6);
    setGameStatus('playing');
    setEnvelopeState('closed');
    setBuyAttemptCost(100);

    requestAnimationFrame(() => {
      const firstInput = document.querySelector<HTMLInputElement>(
        `input[data-index="0"]`
      );
      firstInput?.focus();
    });
  };

  const getEnvelopeClass = () => {
    const baseClass = 'envelope-container transition-all duration-1000';
    switch (envelopeState) {
      case 'opening':
        return `${baseClass} envelope-opening`;
      case 'success':
        return `${baseClass} envelope-success`;
      case 'failed':
        return `${baseClass} envelope-failed`;
      default:
        return `${baseClass} envelope-closed`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Coins */}
      <div className="flex items-center justify-end mb-8">
        <Coins className="w-5 h-5 text-yellow-500" />
        <span className="ml-2 text-lg font-bold">{userCoins.toLocaleString()}</span>
      </div>

      {/* Game Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          F1 SECRET: CODE BREAKER
        </h1>
        <p className="text-gray-400">Взломайте конверт за 6 попыток</p>
      </div>

      {/* Envelope */}
      <div className="flex justify-center mb-8">
        <div className={getEnvelopeClass()}>
          <div className="envelope w-64 h-40 relative">
            <div className="envelope-body bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-2xl">
              <div className="envelope-glow"></div>
              <div className="envelope-content p-6 text-center">
                <div className="text-2xl font-bold mb-2">SECRET</div>
                <div className="text-sm opacity-75">CODE: ??? ??? ???</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attempts Counter */}
      <div className="text-center mb-6">
        <div className="text-lg">
          <span className="text-gray-400">LAP:</span>{' '}
          <span className="text-white font-bold">{6 - remainingAttempts}/6</span>
        </div>
      </div>

      {/* Input Section */}
      {gameStatus === 'playing' && (
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Input
                key={i}
                data-index={i}
                type="text"
                maxLength={1}
                value={currentGuess[i] || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (!value) return; // запрещаем удаление

                  const newGuess = currentGuess.split('');
                  newGuess[i] = value;
                  const joinedGuess = newGuess.join('').slice(0, 6);
                  setCurrentGuess(joinedGuess);

                  // динамическая подсветка
                  const paddedGuess = joinedGuess.padEnd(6, ' ');
                  const results: GuessResult[] = paddedGuess.split('').map((digit, idx) => {
                    if (digit === ' ') return { digit: '', status: 'empty' };
                    if (digit === secretCode[idx]) return { digit, status: 'hot-lap' };
                    if (secretCode.includes(digit)) return { digit, status: 'pit-hint' };
                    return { digit, status: 'dnf' };
                  });
                  setCurrentResults(results);

                  // автофокус вперёд
                  if (value && i < 5) {
                    requestAnimationFrame(() => {
                      const nextInput = document.querySelector<HTMLInputElement>(
                        `input[data-index="${i + 1}"]`
                      );
                      nextInput?.focus();
                    });
                  }

                  // автопроверка
                  if (
                    joinedGuess.length === 6 &&
                    joinedGuess.split('').every((c) => c !== ' ' && c !== '')
                  ) {
                    setEnvelopeState('opening');
                    setTimeout(() => {
                      processGuess(joinedGuess);
                    }, 1500);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace') {
                    e.preventDefault(); // блокируем удаление
                  }
                }}
                className={`w-[50px] h-[72px] text-center text-2xl font-bold border-none rounded 
                  ${
                    currentResults[i]?.status === 'hot-lap'
                      ? 'bg-red-500 text-red-200'
                      : currentResults[i]?.status === 'pit-hint'
                      ? 'bg-blue-500 text-blue-200'
                      : currentResults[i]?.status === 'dnf'
                      ? 'bg-gray-500 text-gray-200'
                      : 'bg-gray-800 text-white'
                  }`}
              />
            ))}
          </div>
        </div>
      )}


      {/* Game Over Actions */}
      {gameStatus !== 'playing' && (
        <div className="text-center space-y-4">
          {gameStatus === 'won' ? (
            <div>
              <h2 className="text-2xl font-bold text-green-500 mb-2">ПОБЕДА! 🏆</h2>
              <p className="text-gray-300">Конверт взломан! Код был: {secretCode}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-red-500 mb-2">ПОРАЖЕНИЕ 💥</h2>
              <p className="text-gray-300">Секретный код: {secretCode}</p>
            </div>
          )}

          <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            <RefreshCw className="w-4 h-4 mr-2" />
            NEXT LAP
          </Button>
        </div>
      )}

      {/* Buy Attempt */}
      {gameStatus === 'lost' && (
        <div className="text-center mt-4">
          <Button
            onClick={handleBuyAttempt}
            disabled={userCoins < buyAttemptCost}
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          >
            <Coins className="w-4 h-4 mr-2" />
            Купить попытку ({buyAttemptCost} монет)
          </Button>
        </div>
      )}

      {/* Legend */}
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-800/50 rounded-lg">
        <h4 className="text-sm font-bold mb-3 text-center">Подсказки:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span>HOT LAP - цифра и позиция верны</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span>PIT HINT - цифра есть, но не здесь</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-500 rounded"></div>
            <span>DNF - цифры нет в коде</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeStrategy;
