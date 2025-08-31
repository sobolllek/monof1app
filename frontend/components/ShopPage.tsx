import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { Package, Star, Coins, Sparkles } from "lucide-react";

// Mock data
const packTypes = [
  {
    id: "basic",
    name: "Базовый пак", 
    description: "3 карты, гарантированно 1 редкая",
    price: { coins: 500, stars: null },
    cards: 3,
    rareGuaranteed: 1,
    image: "🎁"
  },
  {
    id: "premium", 
    name: "Премиум пак",
    description: "5 карт, гарантированно 1 эпическая",
    price: { coins: 1200, stars: null },
    cards: 5,
    rareGuaranteed: 1,
    epicGuaranteed: 1,
    image: "💎"
  },
  {
    id: "legendary",
    name: "Легендарный пак",
    description: "7 карт, гарантированно 1 легендарная",
    price: { coins: null, stars: 15 },
    cards: 7,
    legendaryGuaranteed: 1,
    image: "⭐"
  }
];

const limitedCards = [
  {
    id: "verstappen_championship",
    name: "Max Verstappen - Чемпион 2023",
    description: "Эксклюзивная карта чемпиона мира",
    price: { stars: 25 },
    timeLeft: "2 дня 14:30",
    image: "🏆"
  },
  {
    id: "monaco_special",
    name: "Monaco GP - Особое издание", 
    description: "Лимитированная карта Monaco Grand Prix",
    price: { stars: 20 },
    timeLeft: "5 дней 08:15",
    image: "🏁"
  }
];

const coinPacks = [
  { id: "small", amount: 1000, price: 5, bonus: 0 },
  { id: "medium", amount: 5000, price: 20, bonus: 500 },
  { id: "large", amount: 12000, price: 40, bonus: 2000 },
  { id: "mega", amount: 30000, price: 80, bonus: 8000 }
];

export const ShopPage = () => {
  const [userCoins] = useState(15420);
  const [userStars] = useState(25);

  const handleBuyPack = (packId: string) => {
    console.log(`Buying pack: ${packId}`);
    // TODO: Implement pack purchase logic
  };

  const handleBuyCard = (cardId: string) => {
    console.log(`Buying limited card: ${cardId}`);
    // TODO: Implement card purchase logic
  };

  const handleBuyCoins = (packId: string) => {
    console.log(`Buying coin pack: ${packId}`);
    // TODO: Implement coin purchase logic
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="card-f1-glow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Магазин</h2>
            <p className="text-muted-foreground">Паки, карты и монеты</p>
          </div>
          <CurrencyDisplay coins={userCoins} stars={userStars} />
        </div>
      </div>

      <Tabs defaultValue="packs" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="packs">Паки карт</TabsTrigger>
          <TabsTrigger value="limited">Лимитированные</TabsTrigger>
          <TabsTrigger value="coins">Монеты</TabsTrigger>
        </TabsList>

        {/* Card Packs */}
        <TabsContent value="packs" className="space-y-4 mt-6">
          <div className="space-y-4">
            {packTypes.map((pack) => (
              <div key={pack.id} className="card-f1-glow">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{pack.image}</div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{pack.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{pack.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{pack.cards} карт</Badge>
                      {pack.rareGuaranteed && (
                        <Badge variant="secondary">Редкая гарантирована</Badge>
                      )}
                      {pack.epicGuaranteed && (
                        <Badge variant="secondary">Эпическая гарантирована</Badge>
                      )}
                      {pack.legendaryGuaranteed && (
                        <Badge variant="secondary">Легендарная гарантирована</Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-1">
                      {pack.price.coins && (
                        <>
                          <Coins className="w-4 h-4 text-accent" />
                          <span className="font-bold">{pack.price.coins.toLocaleString()}</span>
                        </>
                      )}
                      {pack.price.stars && (
                        <>
                          <Star className="w-4 h-4 text-primary" />
                          <span className="font-bold">{pack.price.stars}</span>
                        </>
                      )}
                    </div>
                    <Button 
                      onClick={() => handleBuyPack(pack.id)}
                      className="btn-f1-primary w-full"
                    >
                      Купить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Limited Cards */}
        <TabsContent value="limited" className="space-y-4 mt-6">
          <div className="space-y-4">
            {limitedCards.map((card) => (
              <div key={card.id} className="card-f1-glow relative overflow-hidden">
                {/* Limited badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="animate-pulse">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Лимитированная
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 pt-8">
                  <div className="text-4xl">{card.image}</div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{card.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{card.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-destructive">
                        Осталось: {card.timeLeft}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-1 justify-end">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="font-bold">{card.price.stars}</span>
                    </div>
                    <Button 
                      onClick={() => handleBuyCard(card.id)}
                      className="btn-f1-gold w-full"
                    >
                      Купить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Coin Packs */}
        <TabsContent value="coins" className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            {coinPacks.map((pack) => (
              <div key={pack.id} className="card-f1-glow text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="text-lg font-bold">{pack.amount.toLocaleString()}</h3>
                {pack.bonus > 0 && (
                  <>
                    <div className="text-sm text-accent font-semibold">
                      +{pack.bonus.toLocaleString()} бонус!
                    </div>
                    <div className="text-xs text-muted-foreground line-through">
                      {(pack.amount - pack.bonus).toLocaleString()}
                    </div>
                  </>
                )}
                <div className="text-sm text-muted-foreground mb-3">монет</div>
                
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="font-bold">{pack.price}</span>
                </div>
                
                <Button 
                  onClick={() => handleBuyCoins(pack.id)}
                  className="btn-f1-secondary w-full"
                >
                  Купить
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};