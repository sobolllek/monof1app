
export type MarketItem = {
  id: number;
  name: string;
  coinPrice: number;
  starPrice?: number;
  availableCurrencies: ('coins' | 'stars')[];
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  type: 'pack' | 'coin' | 'card';
  packType?: 'base' | 'gold' | 'gem' | 'limit' | 'prize';
};

export const allItems: Record<string, MarketItem[]> = {
  buyPacks: [
    {
      id: 1,
      name: 'Base Pack',
      coinPrice: 500,
      starPrice: 50,
      availableCurrencies: ['coins', 'stars'],
      description: '3 карты, 1 редкая',
      image: '📦',
      rarity: 'common',
      type: 'pack',
      packType: 'base'
    },
    {
      id: 2,
      name: 'Gold Pack',
      coinPrice: 1200,
      starPrice: 120,
      availableCurrencies: ['coins', 'stars'],
      description: '5 карт, 1 эпическая',
      image: '🎁',
      rarity: 'rare',
      type: 'pack',
      packType: 'gold'
    },
    {
      id: 3,
      name: 'Gem Pack',
      coinPrice: 2000,
      starPrice: 200,
      availableCurrencies: ['coins', 'stars'],
      description: '7 карт, 1 легендарная',
      image: '💎',
      rarity: 'epic',
      type: 'pack',
      packType: 'gem'
    },
    {
      id: 4,
      name: 'Limit Pack',
      coinPrice: 3000,
      starPrice: 300,
      availableCurrencies: ['stars'],
      description: 'Эксклюзивный набор (лимитированный)',
      image: '🔥',
      rarity: 'legendary',
      type: 'pack',
      packType: 'limit'
    },
    {
      id: 5,
      name: 'Prize Pack',
      coinPrice: 2500,
      starPrice: 250,
      availableCurrencies: ['stars'],
      description: 'Набор с гарантированными призовыми картами',
      image: '🏆',
      rarity: 'epic',
      type: 'pack',
      packType: 'prize'
    }
  ],
  buyCards: [
    {
      id: 101,
      name: 'Legendary Card',
      coinPrice: 5000,
      starPrice: 50,
      availableCurrencies: ['stars'],
      description: 'Уникальная карта',
      image: '🃏',
      rarity: 'legendary',
      type: 'card'
    }
  ],
  buyCoins: [
    {
      id: 201,
      name: '1000 Coins',
      coinPrice: 0,
      starPrice: 1.99,
      availableCurrencies: ['stars'],
      description: 'Игровая валюта',
      image: '🪙',
      rarity: 'common',
      type: 'coin'
    }
  ]
};

export const categoryNames = {
  buyPacks: 'Паки карт',
  buyCoins: 'Покупка монет',
  buyCards: 'Эксклюзивные карты'
};