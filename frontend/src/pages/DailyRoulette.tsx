import { useState, useEffect, useRef } from 'react';
import { roulettePrizes, rouletteChances } from '@/data/roulettePrizes';

const DailyRoulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [rotation, setRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [wonPrize, setWonPrize] = useState<any>(null);
  const [userCoins, setUserCoins] = useState(100); // mock
  const spinCost = 20;
  const wheelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const prizes = roulettePrizes;

  const getWeightedRandomPrize = () => {
    const totalWeight = rouletteChances.reduce((sum, chance) => sum + chance.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;

    for (const chance of rouletteChances) {
      cumulative += chance.weight;
      if (rand <= cumulative) {
        return prizes.find(p => p.id === chance.prizeId)!;
      }
    }

    return prizes[0]; // fallback
  };

  const spin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setShowPrize(false);

    const prize = getWeightedRandomPrize();
    const prizeIndex = prizes.findIndex(p => p.id === prize.id);
    const segmentAngle = 360 / prizes.length;
    const targetAngle = prizeIndex * segmentAngle + segmentAngle / 2;
    const spins = 5 + Math.random() * 3;
    const totalRotation = spins * 360 + (360 - targetAngle);
    const startTime = performance.now();
    const duration = 4000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentRotation = rotation + totalRotation * easedProgress;

      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setShowPrize(true);
        setRotation(currentRotation % 360);
        setWonPrize(prize);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const claimPrize = () => {
    setShowPrize(false);
    setCanSpin(false);

    if (wonPrize?.name === 'Еще попытка') {
      setCanSpin(true);
    } else if (wonPrize?.name.includes('монет')) {
      const amount = parseInt(wonPrize.name.split(' ')[0]);
      setUserCoins(prev => prev + amount);
    }

    const nextSpin = new Date();
    nextSpin.setHours(nextSpin.getHours() + 24);
    setNextSpinTime(nextSpin);
  };

  useEffect(() => {
    if (nextSpinTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = nextSpinTime.getTime() - now.getTime();

        if (diff <= 0) {
          setCanSpin(true);
          setNextSpinTime(null);
          setTimeLeft('');
        } else {
          const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
          const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
          const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
          setTimeLeft(`${h}:${m}:${s}`);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [nextSpinTime]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pt-32">
      <h1 className="text-2xl font-bold text-center mb-4">Ежедневная рулетка</h1>

      {!canSpin && !showPrize && (
        <div className="text-center mb-4">
          <p className="text-lg">Следующий спин через</p>
          <p className="text-3xl text-purple-400 font-mono">{timeLeft}</p>
        </div>
      )}

      <div className="relative mb-6 mx-auto w-80 h-80">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-purple-400" />
        </div>

        <div
          ref={wheelRef}
          className="w-full h-full rounded-full shadow-xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${prizes.map((p, i) =>
              `${p.color} ${(360 / prizes.length) * i}deg ${(360 / prizes.length) * (i + 1)}deg`
            ).join(', ')})`
          }}
        >
          {prizes.map((prize, index) => {
            const angle = (index * 360) / prizes.length - 360 / prizes.length / 2;
            return (
              <div
                key={prize.id}
                className="absolute w-full h-full flex items-center justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="absolute top-8 flex flex-col items-center">
                  <div className="text-3xl">{prize.icon}</div>
                  <div className="text-xs font-bold bg-black/50 px-2 py-1 rounded mt-1">
                    {prize.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={spin}
          disabled={!canSpin || isSpinning || showPrize}
          className={`px-10 py-3 rounded-full text-lg font-bold transition-all ${
            canSpin && !isSpinning && !showPrize
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSpinning ? 'Крутится...' : canSpin ? 'Крутить' : 'Недоступно'}
        </button>

        {!canSpin && !showPrize && (
          <button
            onClick={() => {
              if (userCoins >= spinCost) {
                setUserCoins(c => c - spinCost);
                setCanSpin(true);
              } else {
                alert('Недостаточно монет!');
              }
            }}
            className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
          >
            Купить попытку за {spinCost} монет
          </button>
        )}

        <p className="text-gray-400 mt-4">Монеты: {userCoins}</p>
      </div>

      {showPrize && wonPrize && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl text-center max-w-sm shadow-lg">
            <div className="text-6xl mb-3">{wonPrize.icon}</div>
            <h2 className="text-xl font-bold text-yellow-400 mb-1">Поздравляем!</h2>
            <p className="text-lg mb-3">Вы выиграли: {wonPrize.name}</p>
            <button
              onClick={claimPrize}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold"
            >
              Забрать приз
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRoulette;
