import { createElement, ReactNode } from 'react';
import { User, MapPin, Car, Calendar, Trophy, Users, UserCheck, Handshake, Target, Award, Star } from 'lucide-react';
import { Card } from '../types/cards';

export const CARD_WIDTH = 231;
export const CARD_HEIGHT = 328;
export const CARD_BORDER_RADIUS = 10;

export interface CardCategory {
  id: string;
  label: string;
  icon: () => ReactNode;
}

export const cardCategories: CardCategory[] = [
  {
    id: 'driver',
    label: 'Пилоты',
    icon: () => createElement(User, { size: 20, className: 'text-blue-400' }),
  },
  {
    id: 'duo',
    label: 'Дуэты',
    icon: () => createElement(Users, { size: 20, className: 'text-purple-400' }),
  },
  {
    id: 'team',
    label: 'Команды',
    icon: () => createElement(Trophy, { size: 20, className: 'text-red-400' }),
  },
  {
    id: 'team_principal',
    label: 'Руководители',
    icon: () => createElement(UserCheck, { size: 20, className: 'text-orange-400' }),
  },
  {
    id: 'track',
    label: 'Трассы',
    icon: () => createElement(MapPin, { size: 20, className: 'text-green-400' }),
  },
  {
    id: 'car',
    label: 'Болиды',
    icon: () => createElement(Car, { size: 20, className: 'text-red-400' }),
  },
  {
    id: 'collab',
    label: 'Коллаборации',
    icon: () => createElement(Handshake, { size: 20, className: 'text-pink-400' }),
  },
  {
    id: 'historical',
    label: 'Исторические',
    icon: () => createElement(Calendar, { size: 20, className: 'text-amber-400' }),
  },
  {
    id: 'race_results',
    label: 'Результаты гонок',
    icon: () => createElement(Target, { size: 20, className: 'text-cyan-400' }),
  },
  {
    id: 'limited',
    label: 'Лимитированные',
    icon: () => createElement(Award, { size: 20, className: 'text-gold-400' }),
  },
  {
    id: 'special',
    label: 'Особые',
    icon: () => createElement(Star, { size: 20, className: 'text-yellow-400' }),
  },
];

export const cardsData: Card[] = [];