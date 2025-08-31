import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RefreshCw, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeBreakerGameProps {
  userCoins: number;
  onCoinsChange: (newCoins: number) => void;
  onBack: () => void;
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

export const CodeBreakerGame = ({ userCoins, onCoinsChange, onBack }: CodeBreakerGameProps) => {
  const [secretCode] = useState(() => {
    // Generate a random 6-digit code
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
  });
  
  const [currentGuess, setCurrentGuess] = useState('');
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'success' | 'failed'>('closed');
  const [buyAttemptCost, setBuyAttemptCost] = useState(100);
  
  const { toast } = useToast();

  const checkGuess = (guess: string): GuessResult[] => {
    const results: GuessResult[] = [];
    const secretDigits = secretCode.split('');
    const guessDigits = guess.split('');
    
    for (let i = 0; i < 6; i++) {
      if (guessDigits[i] === secretDigits[i]) {
        results.push({ digit: guessDigits[i], status: 'hot-lap' });
      } else if (secretDigits.includes(guessDigits[i])) {
        results.push({ digit: guessDigits[i], status: 'pit-hint' });
      } else {
        results.push({ digit: guessDigits[i], status: 'dnf' });
      }
    }
    
    return results;
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 6 || !/^\d{6}$/.test(currentGuess)) {
      toast({
        title: "Неверный формат",
        description: "Введите 6 цифр",
        variant: "destructive"
      });
      return;
    }

    setEnvelopeState('opening');
    
    setTimeout(() => {
      const results = checkGuess(currentGuess);
      const newAttempt: Attempt = { guess: currentGuess, results };
      setAttempts(prev => [...prev, newAttempt]);
      
      const isWin = results.every(r => r.status === 'hot-lap');
      
      if (isWin) {
        setGameStatus('won');
        setEnvelopeState('success');
        const reward = 500;
        onCoinsChange(userCoins + reward);
        toast({
          title: "ПОБЕДА! 🏆",
          description: `Конверт взломан! +${reward} монет`,
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
    }, 1500);
  };

  const handleBuyAttempt = () => {
    if (userCoins < buyAttemptCost) {
      toast({
        title: "Недостаточно монет",
        description: `Нужно ${buyAttemptCost} монет`,
        variant: "destructive"
      });
      return;
    }

    onCoinsChange(userCoins - buyAttemptCost);
    setRemainingAttempts(prev => prev + 1);
    setBuyAttemptCost(prev => Math.floor(prev * 1.5));
    setGameStatus('playing');
    setEnvelopeState('closed');
    
    toast({
      title: "Куплена попытка!",
      description: `Следующая попытка: ${Math.floor(buyAttemptCost * 1.5)} монет`,
    });
  };

  const resetGame = () => {
    setCurrentGuess('');
    setAttempts([]);
    setRemainingAttempts(6);
    setGameStatus('playing');
    setEnvelopeState('closed');
    setBuyAttemptCost(100);
  };

  const getCellStatusColor = (status: CellStatus) => {
    switch (status) {
      case 'hot-lap': return 'bg-red-500 text-white';
      case 'pit-hint': return 'bg-blue-500 text-white';
      case 'dnf': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getEnvelopeClass = () => {
    const baseClass = "envelope-container transition-all duration-1000";
    switch (envelopeState) {
      case 'opening': return `${baseClass} envelope-opening`;
      case 'success': return `${baseClass} envelope-success`;
      case 'failed': return `${baseClass} envelope-failed`;
      default: return `${baseClass} envelope-closed`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-bold">{userCoins.toLocaleString()}</span>
        </div>
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
          <div className="flex space-x-2 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Input
                key={i}
                type="text"
                maxLength={1}
                value={currentGuess[i] || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const newGuess = currentGuess.split('');
                  newGuess[i] = value;
                  setCurrentGuess(newGuess.join('').slice(0, 6));
                  
                  // Auto-focus next input
                  if (value && i < 5) {
                    const nextInput = e.target.parentElement?.nextElementSibling?.querySelector('input');
                    nextInput?.focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg font-bold bg-gray-800 border-gray-600 text-white"
              />
            ))}
          </div>
          
          <Button
            onClick={handleSubmitGuess}
            disabled={currentGuess.length !== 6 || envelopeState === 'opening'}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
          >
            {envelopeState === 'opening' ? 'OPENING ENVELOPE...' : 'OPEN ENVELOPE'}
          </Button>
        </div>
      )}

      {/* Previous Attempts */}
      {attempts.length > 0 && (
        <div className="max-w-md mx-auto mb-8">
          <h3 className="text-lg font-bold mb-4 text-center">Попытки:</h3>
          <div className="space-y-3">
            {attempts.map((attempt, attemptIndex) => (
              <div key={attemptIndex} className="flex items-center justify-center space-x-2">
                <span className="text-gray-400 w-8">#{attemptIndex + 1}</span>
                {attempt.results.map((result, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold ${getCellStatusColor(result.status)}`}
                  >
                    {result.digit}
                  </div>
                ))}
              </div>
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
          
          <Button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
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