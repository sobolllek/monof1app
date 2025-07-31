export type RoulettePrize = {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
  
  export type RouletteChance = {
    prizeId: number;
    weight: number; // шанс в %
  };
  
  // Призы (визуальные и смысловые данные)
  export const roulettePrizes: RoulettePrize[] = [
    { id: 1, name: 'Пусто', icon: '❌', color: '#2f2f2f' },
    { id: 2, name: '10 монет', icon: '🪙', color: '#FFD700' },
    { id: 3, name: '40 монет', icon: '🪙', color: '#F4C430' },
    { id: 4, name: '80 монет', icon: '🪙', color: '#E5B80B' },
    { id: 5, name: 'Еще попытка', icon: '🔁', color: '#7B68EE' },
    { id: 6, name: 'Пак карт', icon: '📦', color: '#98D8C8' },
    { id: 7, name: 'Карта с большой редкостью', icon: '💎', color: '#00BFFF' },
    { id: 8, name: '1 монета', icon: '🪙', color: '#B0C4DE' }
  ];
  
  // Шансы (в процентах, суммарно — 100)
  export const rouletteChances: RouletteChance[] = [
    { prizeId: 1, weight: 20 },
    { prizeId: 2, weight: 33 },
    { prizeId: 3, weight: 20 },
    { prizeId: 4, weight: 10 },
    { prizeId: 5, weight: 2 },
    { prizeId: 6, weight: 1 },
    { prizeId: 7, weight: 2 },
    { prizeId: 8, weight: 12 }
  ];
  