
import { useState, useEffect } from 'react';

export interface DailyPack {
  id: string;
  type: 'morning' | 'evening';
  category: 'common' | 'rare' | 'epic';
  date: string;
  claimed: boolean;
  emoji: string;
  name: string;
}

export const useDailyPacks = () => {
  const [dailyPacks, setDailyPacks] = useState<DailyPack[]>([]);

  const packTypes = {
    morning: {
      categories: [
        { category: 'common' as const, emoji: '🌅', name: 'Утренний стартер', chance: 60 },
        { category: 'rare' as const, emoji: '☀️', name: 'Солнечный пак', chance: 35 },
        { category: 'epic' as const, emoji: '🌟', name: 'Рассветный легенд', chance: 5 }
      ]
    },
    evening: {
      categories: [
        { category: 'common' as const, emoji: '🌙', name: 'Вечерний бустер', chance: 60 },
        { category: 'rare' as const, emoji: '✨', name: 'Звездный пак', chance: 35 },
        { category: 'epic' as const, emoji: '🌃', name: 'Ночной премиум', chance: 5 }
      ]
    }
  };

  const generateDailyPack = (type: 'morning' | 'evening', date: string): DailyPack => {
    const categories = packTypes[type].categories;
    const random = Math.random() * 100;
    
    let selectedCategory = categories[0];
    let cumulative = 0;
    
    for (const cat of categories) {
      cumulative += cat.chance;
      if (random <= cumulative) {
        selectedCategory = cat;
        break;
      }
    }
    
    return {
      id: `${date}-${type}`,
      type,
      category: selectedCategory.category,
      date,
      claimed: false,
      emoji: selectedCategory.emoji,
      name: selectedCategory.name
    };
  };

  const checkAndGeneratePacks = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Получаем сохраненные паки
    const savedPacks = localStorage.getItem('dailyPacks');
    let packs: DailyPack[] = savedPacks ? JSON.parse(savedPacks) : [];
    
    // Проверяем, нужно ли добавить утренний пак (8:00)
    const morningPackId = `${today}-morning`;
    const hasMorningPack = packs.some(pack => pack.id === morningPackId);
    
    if (!hasMorningPack && (now.getHours() >= 8 || now.getDate() !== new Date().getDate())) {
      const morningPack = generateDailyPack('morning', today);
      packs.push(morningPack);
    }
    
    // Проверяем, нужно ли добавить вечерний пак (20:00)
    const eveningPackId = `${today}-evening`;
    const hasEveningPack = packs.some(pack => pack.id === eveningPackId);
    
    if (!hasEveningPack && now.getHours() >= 20) {
      const eveningPack = generateDailyPack('evening', today);
      packs.push(eveningPack);
    }
    
    // Удаляем старые паки (старше 7 дней)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    packs = packs.filter(pack => new Date(pack.date) >= weekAgo);
    
    localStorage.setItem('dailyPacks', JSON.stringify(packs));
    setDailyPacks(packs);
  };

  const claimPack = (packId: string) => {
    const updatedPacks = dailyPacks.map(pack => 
      pack.id === packId ? { ...pack, claimed: true } : pack
    );
    localStorage.setItem('dailyPacks', JSON.stringify(updatedPacks));
    setDailyPacks(updatedPacks);
  };

  const getUnclaimedPacks = () => dailyPacks.filter(pack => !pack.claimed);
  
  const getNextUnclaimedPack = () => getUnclaimedPacks()[0] || null;

  useEffect(() => {
    checkAndGeneratePacks();
    
    // Проверяем каждую минуту
    const interval = setInterval(checkAndGeneratePacks, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    dailyPacks,
    unclaimedPacks: getUnclaimedPacks(),
    nextUnclaimedPack: getNextUnclaimedPack(),
    availablePack: getNextUnclaimedPack(),
    claimPack,
    checkAndGeneratePacks
  };
};
