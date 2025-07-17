import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBackButton } from '@/hooks/useBackButton';

const DailyRoulette = () => {
  useBackButton();
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [rotation, setRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [wonPrize, setWonPrize] = useState<any>(null);

  const prizes = [
    { id: 1, name: '500 монет', icon: '🪙', color: '#FFD700' },
    { id: 2, name: 'Карта', icon: '🎴', color: '#FF6B6B' },
    { id: 3, name: '100 монет', icon: '🪙', color: '#4ECDC4' },
    { id: 4, name: 'Энергия', icon: '⚡', color: '#45B7D1' },
    { id: 5, name: '1000 монет', icon: '🪙', color: '#96CEB4' },
    { id: 6, name: 'Редкая карта', icon: '💎', color: '#FFEAA7' },
    { id: 7, name: '200 монет', icon: '🪙', color: '#DDA0DD' },
    { id: 8, name: 'Пак карт', icon: '📦', color: '#98D8C8' }
  ];

  const spin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setShowPrize(false);
    
    // Определяем выигрышный приз
    const prizeIndex = Math.floor(Math.random() * 8);
    const prize = prizes[prizeIndex];
    
    // Вычисляем угол для остановки на выбранном призе
    const segmentAngle = 360 / 8; // 45 градусов на сегмент
    const targetAngle = prizeIndex * segmentAngle + segmentAngle / 2;
    
    // Добавляем несколько полных оборотов для эффекта
    const spins = 5 + Math.random() * 3; // 5-8 оборотов
    const newRotation = spins * 360 + (360 - targetAngle);
    
    setRotation(prev => prev + newRotation);
    setWonPrize(prize);

    // Показываем приз через 4 секунды (время анимации)
    setTimeout(() => {
      setIsSpinning(false);
      setShowPrize(true);
    }, 4000);
  };

  const claimPrize = () => {
    setShowPrize(false);
    setCanSpin(false);
    
    // Устанавливаем время следующего спина (24 часа)
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
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [nextSpinTime]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-500/5 to-transparent rounded-full"></div>
      </div>

      {/* Header */}
      <header className="flex items-center p-4 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-4">Ежедневная рулетка</h1>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 relative z-10">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Испытай удачу прямо сейчас!
        </h2>
        
        {!canSpin && !showPrize && (
          <div className="mb-6 text-center">
            <div className="text-lg font-semibold mb-2">Следующий спин через</div>
            <div className="text-3xl font-mono text-purple-400">{timeLeft}</div>
          </div>
        )}

        {/* Roulette Wheel */}
        <div className="relative mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-purple-400 drop-shadow-lg"></div>
          </div>

          {/* Wheel */}
          <div 
            className={`relative w-80 h-80 rounded-full shadow-2xl ${
              isSpinning ? 'transition-transform duration-[4000ms] ease-out' : 'transition-none'
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              background: 'conic-gradient(from 0deg, #FF6B6B 0deg 45deg, #4ECDC4 45deg 90deg, #45B7D1 90deg 135deg, #96CEB4 135deg 180deg, #FFEAA7 180deg 225deg, #DDA0DD 225deg 270deg, #98D8C8 270deg 315deg, #FFD700 315deg 360deg)',
              boxShadow: '0 0 50px rgba(147, 51, 234, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Prize sections */}
            {prizes.map((prize, index) => {
              const angle = (index * 45) - 22.5;
              return (
                <div
                  key={prize.id}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'center'
                  }}
                >
                  <div className="absolute top-8 flex flex-col items-center">
                    <div className="text-3xl mb-1 drop-shadow-md">{prize.icon}</div>
                    <div className="text-xs font-bold text-center px-2 py-1 bg-black/50 rounded-md whitespace-nowrap backdrop-blur-sm">
                      {prize.name.split(' ').map((word, i) => (
                        <div key={i}>{word}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-white to-gray-200 rounded-full shadow-lg border-4 border-gray-300 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={!canSpin || isSpinning || showPrize}
          className={`px-12 py-4 rounded-full text-lg font-bold transition-all duration-200 ${
            canSpin && !isSpinning && !showPrize
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:scale-105 shadow-lg hover:shadow-purple-500/25'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSpinning ? 'Крутится...' : canSpin && !showPrize ? 'Крутить' : 'Недоступно'}
        </button>

        {/* Info */}
        <p className="text-gray-400 text-center mt-4 max-w-sm">
          Вращайте рулетку каждый день и получайте потрясающие призы!
        </p>
      </div>

      {/* Prize Modal */}
      {showPrize && wonPrize && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-600 text-center max-w-sm mx-4 animate-scale-in shadow-2xl">
            <div className="text-6xl mb-4 animate-bounce">{wonPrize.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-yellow-400">Поздравляем!</h3>
            <p className="text-lg mb-2">Вы выиграли:</p>
            <p className="text-xl font-bold mb-6 text-white">{wonPrize.name}</p>
            <button
              onClick={claimPrize}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
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
