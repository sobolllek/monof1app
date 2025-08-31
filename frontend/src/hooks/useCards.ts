import { useEffect, useState } from 'react';
import { Card } from '../types/cards';

export function useCards(categoryId?: string) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const apiUrl = 'http://localhost:3001';
        const url = new URL(`${apiUrl}/cards`);
        if (categoryId && categoryId !== 'all') {
          url.searchParams.append('category', categoryId);
        }
        console.log('Fetching from:', url.toString());

        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store', // Отключаем кэш
        });

        if (!res.ok) throw new Error(`Ошибка API: ${res.statusText} (status: ${res.status})`);
        const data = await res.json();
        console.log('API response:', data);

        if (!data.cards || !Array.isArray(data.cards)) {
          throw new Error('Неверный формат ответа API: cards не массив');
        }

        const mappedCards = data.cards.map((card: any) => ({
          id: card.id.toString(),
          name: card.name,
          type: card.type,
          team: card.team || null,
          rarity: card.rarity,
          image: card.imageUrl || '/placeholder.png', // Фallback на placeholder
          description: card.description || '',
          dropInfo: {
            isDroppable: !!card.isDroppable,
            dropLimit: card.dropLimit === 0 ? 'infinity' : card.dropLimit || 100,
            year: card.year || 2024,
          },
          isHidden: !!card.isHidden,
        }));

        console.log('Mapped cards:', mappedCards);
        setCards(mappedCards);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, [categoryId]);

  return { cards, loading, error };
}