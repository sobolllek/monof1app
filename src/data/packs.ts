export type MarketItem = {
    id: number;
    name: string;
    price: number;
    currency: 'coins' | 'stars';
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
        price: 500,
        currency: 'coins',
        description: '3 карты, 1 редкая',
        image: '📦',
        rarity: 'common',
        type: 'pack',
        packType: 'base'
      },
      {
        id: 2,
        name: 'Gold Pack',
        price: 1200,
        currency: 'coins',
        description: '5 карт, 1 эпическая',
        image: '🎁',
        rarity: 'rare',
        type: 'pack',
        packType: 'gold'
      },
      {
        id: 3,
        name: 'Gem Pack',
        price: 2000,
        currency: 'coins',
        description: '7 карт, 1 легендарная',
        image: '💎',
        rarity: 'epic',
        type: 'pack',
        packType: 'gem'
      },
      {
        id: 4,
        name: 'Limit Pack',
        price: 3000,
        currency: 'stars',
        description: 'Эксклюзивный набор (лимитированный)',
        image: '🔥',
        rarity: 'legendary',
        type: 'pack',
        packType: 'limit'
      },
      {
        id: 5,
        name: 'Prize Pack',
        price: 2500,
        currency: 'stars',
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
        price: 50,
        currency: 'stars',
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
        price: 1.99,
        currency: 'stars',
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