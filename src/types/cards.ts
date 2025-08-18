export type Rarity = 'ultrasoft' | 'supersoft' | 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
export type CardType = 'driver' | 'duo' | 'team' | 'team_principal' | 'track' | 'car' | 'collab' | 'historical' | 'race_results' | 'limited' | 'special';
export type Team = 
  | 'Red Bull' | 'Ferrari' | 'Mercedes' | 'McLaren' | 'Aston Martin' 
  | 'Alpine' | 'Williams' | 'Racing Bulls' | 'Sauber' | 'Haas' | 'Maserati' 
  | 'March' | 'Surtees' | 'Toro Rosso' | 'Lotus' | 'Tyrrell' | 'Brabham';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  team?: Team;
  rarity: Rarity;
  image: string; 
  description: string;
  dropInfo: {
    isDroppable: boolean;
    dropLimit?: number | 'infinity';
    year: number;
  };
  isHidden?: boolean;
}

export interface MarketItem {
  id: string;
  name: string;
  team?: Team;
  rarity: Rarity;
  type: CardType;
  image: string;
  currency: 'coins' | 'stars';
  price: number;
}

export interface CardCategory {
  id: string;
  label: string;
  icon: () => React.ReactNode;
}

export interface TradingOffer {
  id: string;
  fromCard?: Card;
  toCard?: Card;
  userName?: string;
  userRating?: number;
  timeRemaining?: string;
  cardName: string;
  seller?: string;
  type: CardType;
  wantedCard?: string;
  price?: number;
  currentBid?: number;
  timeLeft: string;
  rarity: Rarity;
  status: string;
}

export const CARD_RARITIES: Record<Rarity, { color: string; name: string; bgColor: string; borderColor: string }> = {
  ultrasoft: { color: 'bg-pink-500', name: 'Ультра-софт', bgColor: 'bg-pink-500', borderColor: 'border-pink-500' },
  supersoft: { color: 'bg-red-500', name: 'Супер-софт', bgColor: 'bg-red-500', borderColor: 'border-red-500' },
  soft: { color: 'bg-yellow-500', name: 'Софт', bgColor: 'bg-yellow-500', borderColor: 'border-yellow-500' },
  medium: { color: 'bg-white', name: 'Медиум', bgColor: 'bg-white', borderColor: 'border-white' },
  hard: { color: 'bg-orange-500', name: 'Хард', bgColor: 'bg-orange-500', borderColor: 'border-orange-500' },
  intermediate: { color: 'bg-green-500', name: 'Интермедиа', bgColor: 'bg-green-500', borderColor: 'border-green-500' },
  wet: { color: 'bg-blue-500', name: 'Дождевые', bgColor: 'bg-blue-500', borderColor: 'border-blue-500' }
};
