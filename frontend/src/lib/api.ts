const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Card {
  id: number;
  name: string;
  type: string;
  team?: string;
  rarity: string;
  imageUrl: string;
  description: string;
  isDroppable: boolean;
  dropLimit: number;
  year: number;
  isHidden: boolean;
  pack: {
    name: string;
    price: number;
  };
}

export interface CardsResponse {
  cards: Card[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Функция для получения карт с бэкенда
export const fetchCards = async (filters: {
  category?: string;
  rarity?: string;
  team?: string;
  page?: number;
  limit?: number;
} = {}): Promise<CardsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.rarity) queryParams.append('rarity', filters.rarity);
  if (filters.team) queryParams.append('team', filters.team);
  if (filters.page) queryParams.append('page', filters.page.toString());
  if (filters.limit) queryParams.append('limit', filters.limit.toString());

  const response = await fetch(`${API_BASE_URL}/cards?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch cards');
  return response.json();
};

// Функция для получения карты по ID
export const fetchCardById = async (id: number): Promise<Card> => {
  const response = await fetch(`${API_BASE_URL}/cards/${id}`);
  if (!response.ok) throw new Error('Failed to fetch card');
  return response.json();
};

// Функция для получения статистики
export const fetchCardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/cards-stats`);
  if (!response.ok) throw new Error('Failed to fetch card stats');
  return response.json();
};