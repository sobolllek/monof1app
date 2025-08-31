import { useState } from "react";
import { X, RotateCcw, Star, Coins } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RouletteGameProps {
  onClose: () => void;
  onRewardWon: (reward: any) => void;
}

const rouletteRewards = [
  { type: "empty", probability: 20, label: "Пусто" },
  { type: "coins", amount: 1, probability: 12, label: "1 монета" },
  { type: "coins", amount: 10, probability: 33, label: "10 монет" },
  { type: "coins", amount: 40, probability: 20, label: "40 монет" },
  { type: "coins", amount: 80, probability: 10, label: "80 монет" },
  { type: "attempt", probability: 3, label: "Попытка" },
  { type: "prize_pack", probability: 1, label: "Prize pack" },
  { type: "limit_card", probability: 1, label: "Лимитированная карта" },
];

export const RouletteGame = ({ onClose, onRewardWon }: RouletteGameProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [rotation, setRotation] = useState(0);

  const spinRoulette = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Random reward selection
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    let selectedReward = rouletteRewards[0];
    
    for (const reward of rouletteRewards) {
      cumulativeProbability += reward.probability;
      if (random <= cumulativeProbability) {
        selectedReward = reward;
        break;
      }
    }
    
    // Random rotation (multiple full rotations + final position)
    const spins = 5 + Math.random() * 3;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);
    
    setTimeout(() => {
      setResult(selectedReward);
      setIsSpinning(false);
      onRewardWon(selectedReward);
      
      const rewardText = selectedReward.label || 
        (selectedReward.type === "coins" ? `${selectedReward.amount} монет` : "Награда");
        
      toast({
        title: "Поздравляем!",
        description: `Вы выиграли: ${rewardText}`,
      });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/80 text-foreground hover:bg-secondary"
        >
          <X size={20} />
        </button>

        <div className="card-f1-glow text-center max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Рулетка удачи</h2>
          
          <div className="relative mb-8">
            {/* Roulette Wheel */}
            <div className="relative w-64 h-64 mx-auto">
              <div 
                className={`w-full h-full rounded-full border-4 border-primary bg-gradient-to-br from-primary/20 to-accent/20 transition-transform duration-3000 ease-out ${
                  isSpinning ? 'animate-spin' : ''
                }`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Roulette Segments */}
                {rouletteRewards.map((reward, index) => {
                  const angle = (360 / rouletteRewards.length) * index;
                  return (
                    <div
                      key={index}
                      className="absolute w-8 h-8 text-xs font-bold flex items-center justify-center"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px)`,
                        transformOrigin: 'center'
                      }}
                    >
                      {reward.type === "coins" && <Coins className="w-4 h-4" />}
                      {reward.type === "empty" && "❌"}
                      {reward.type === "attempt" && "🎯"}
                      {reward.type === "prize_pack" && "🎁"}
                      {reward.type === "limit_card" && "⭐"}
                    </div>
                  );
                })}
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-accent"></div>
              </div>
            </div>
          </div>

          {result ? (
            <div className="mb-6">
              <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                <div className="text-lg font-bold text-accent">Вы выиграли!</div>
                <div className="text-foreground">
                  {result.label}
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="btn-f1-primary w-full"
              >
                Забрать награду
              </button>
            </div>
          ) : (
            <button
              onClick={spinRoulette}
              disabled={isSpinning}
              className={`w-full ${isSpinning ? 'btn-f1-secondary' : 'btn-f1-gold'}`}
            >
              <RotateCcw className={`w-5 h-5 mr-2 ${isSpinning ? 'animate-spin' : ''}`} />
              {isSpinning ? 'Крутится...' : 'Крутить рулетку'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};