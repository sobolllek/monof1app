import { useState } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CARD_RARITIES, type Rarity } from "@/types/cards";

interface PackOpeningProps {
  onClose: () => void;
  onPackOpened: (rewards: any[]) => void;
  packType?: keyof typeof packTypes;
}

// Pack types and their probabilities
const packTypes = {
  base: { name: "База", color: "gray" },
  gold: { name: "Золото", color: "yellow" },
  gem: { name: "Гем", color: "purple" },
  prize: { name: "Приз", color: "green" },
  limit: { name: "Лимит", color: "red" }
};

// Card rarities with values
const cardRarityValues = {
  ultrasoft: 50,
  supersoft: 100,
  soft: 200,
  medium: 400,
  hard: 600,
  intermediate: 800,
  wet: 1000
};

// Drop chances based on pack type (from uploaded image)
const dropChances = {
  base: { ultrasoft: 45, supersoft: 20, soft: 8, medium: 0, hard: 0, intermediate: 0, wet: 0 },
  gold: { ultrasoft: 40, supersoft: 30, soft: 15, medium: 3, hard: 2, intermediate: 0, wet: 0 },
  gem: { ultrasoft: 10, supersoft: 17, soft: 22, medium: 15, hard: 10, intermediate: 8, wet: 1 },
  prize: { ultrasoft: 0, supersoft: 0, soft: 0, medium: 25, hard: 17, intermediate: 12, wet: 1 },
  limit: { ultrasoft: 0, supersoft: 0, soft: 0, medium: 0, hard: 0, intermediate: 0, wet: 100 }
};

const generatePackRewards = (packType: keyof typeof packTypes) => {
  const chances = dropChances[packType];
  const rewards = [];
  const cardNames = [
    "Max Verstappen", "Lewis Hamilton", "Charles Leclerc", "Lando Norris",
    "Red Bull Racing", "Ferrari", "McLaren", "Mercedes",
    "Monaco GP", "Silverstone", "Spa-Francorchamps", "Monza"
  ];
  
  // Always 3 cards per pack
  for (let i = 0; i < 3; i++) {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarity, chance] of Object.entries(chances)) {
      cumulative += chance;
      if (random <= cumulative && chance > 0) {
        const rarityConfig = CARD_RARITIES[rarity as Rarity];
        const cardName = cardNames[Math.floor(Math.random() * cardNames.length)];
        rewards.push({
          type: "card",
          name: cardName,
          rarity: rarity as Rarity,
          rarityName: rarityConfig.name,
          value: cardRarityValues[rarity as Rarity]
        });
        break;
      }
    }
  }
  
  return rewards;
};

export const PackOpening = ({ onClose, onPackOpened, packType = "base" }: PackOpeningProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [rewards, setRewards] = useState<any[]>([]);

  const openPack = async () => {
    setIsOpening(true);
    
    // Simulate pack opening animation
    setTimeout(() => {
      const packRewards = generatePackRewards(packType);
      setRewards(packRewards);
      setShowRewards(true);
      setIsOpening(false);
      onPackOpened(packRewards);
      toast({
        title: "Пак открыт!",
        description: `Получен ${packTypes[packType].name} пак с ${packRewards.length} картами!`,
      });
    }, 2000);
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
          {!showRewards ? (
            <>
              <h2 className="text-2xl font-bold mb-6">Открытие пака: {packTypes[packType].name}</h2>
              
              <div className="mb-8">
                <div className={`w-32 h-40 mx-auto rounded-xl border-2 border-primary flex items-center justify-center ${
                  isOpening ? 'pack-glow animate-card-flip' : 'bg-gradient-to-br from-primary/20 to-accent/20'
                }`}>
                  <Gift size={48} className="text-primary" />
                </div>
              </div>

              {!isOpening ? (
                <button
                  onClick={openPack}
                  className="btn-f1-primary w-full"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Открыть пак
                </button>
              ) : (
                <div className="text-accent font-bold">
                  Открываем пак...
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-accent">Поздравляем!</h2>
              
              <div className="grid grid-cols-1 gap-3 mb-6">
                {rewards.map((reward, index) => {
                  const rarityConfig = CARD_RARITIES[reward.rarity];
                  return (
                    <div key={index} className="trading-card animate-fade-in">
                      <div className="text-2xl mb-2">🏎️</div>
                      <div className="font-bold text-sm mb-1">{reward.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-lg ${rarityConfig.bgColor} ${rarityConfig.color} border-0`}>
                        {rarityConfig.name}
                      </div>
                      <div className="text-accent font-bold text-xs mt-2">+{reward.value}★</div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="btn-f1-primary w-full"
              >
                Отлично!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};