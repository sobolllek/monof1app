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

export const cardsData: Card[] = [
  { 
    id: '1', 
    name: 'Max Verstappen', 
    team: 'Red Bull', 
    rarity: 'ultrasoft', 
    type: 'driver', 
    image: '/image/cards/drivers/verstappen/verstappen-1.png',
    description: 'Трехкратный чемпион мира Формулы 1 2021, 2022, 2023',
    dropInfo: { isDroppable: true, dropLimit: 100, year: 2024 }
  },
  { 
    id: '2', 
    name: 'Lewis Hamilton', 
    team: 'Mercedes', 
    rarity: 'ultrasoft', 
    type: 'driver', 
    image: '/image/cards/drivers/hamilton/hamilton-1.png',
    description: 'Семикратный чемпион мира, рекордсмен по победам',
    dropInfo: { isDroppable: true, dropLimit: 80, year: 2024 }
  },
  { 
    id: '3', 
    name: 'Charles Leclerc', 
    team: 'Ferrari', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/leclerc/leclerc-1.png',
    description: 'Лидер Ferrari, множественный победитель гонок',
    dropInfo: { isDroppable: true, dropLimit: 150, year: 2024 }
  },
  { 
    id: '4', 
    name: 'Lando Norris', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/norris/norris-1.png',
    description: 'Восходящая звезда McLaren, первый победитель 2024',
    dropInfo: { isDroppable: true, dropLimit: 200, year: 2024 }
  },
  { 
    id: '5', 
    name: 'George Russell', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/russell/russell-1.png',
    description: 'Талантливый пилот Mercedes',
    dropInfo: { isDroppable: true, dropLimit: 180, year: 2024 }
  },
  { 
    id: '6', 
    name: 'Carlos Sainz Jr.', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/sainz/sainz-1.png',
    description: 'Опытный пилот Ferrari, победитель Гран-при',
    dropInfo: { isDroppable: true, dropLimit: 160, year: 2024 }
  },
  { 
    id: '7', 
    name: 'Sergio Perez', 
    team: 'Red Bull', 
    rarity: 'medium', 
    type: 'driver', 
    image: '/image/cards/drivers/perez/perez-1.png',
    description: 'Опытный второй пилот Red Bull Racing',
    dropInfo: { isDroppable: true, dropLimit: 220, year: 2024 }
  },
  { 
    id: '8', 
    name: 'Fernando Alonso', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/alonso/alonso-1.png',
    description: 'Двукратный чемпион мира, легенда Ф1',
    dropInfo: { isDroppable: true, dropLimit: 120, year: 2024 }
  },
  { 
    id: '9', 
    name: 'Oscar Piastri', 
    team: 'McLaren', 
    rarity: 'medium', 
    type: 'driver', 
    image: '/image/cards/drivers/piastri/piastri-1.png',
    description: 'Перспективный новичок McLaren',
    dropInfo: { isDroppable: true, dropLimit: 250, year: 2024 }
  },
  { 
    id: '10', 
    name: 'Lance Stroll', 
    team: 'Aston Martin', 
    rarity: 'hard', 
    type: 'driver', 
    image: '/image/cards/drivers/stroll/stroll-1.png',
    description: 'Пилот Aston Martin',
    dropInfo: { isDroppable: true, dropLimit: 300, year: 2024 }
  },
  { 
    id: '11', 
    name: 'Alexander Albon', 
    team: 'Williams', 
    rarity: 'medium', 
    type: 'driver', 
    image: '/image/cards/drivers/albon/albon-1.png',
    description: 'Пилот Williams, бывший гонщик Red Bull',
    dropInfo: { isDroppable: true, dropLimit: 200, year: 2024 }
  },
  { 
    id: '12', 
    name: 'Valtteri Bottas', 
    team: 'Sauber', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/bottas/bottas-1.png',
    description: 'Опытный финский гонщик, бывший пилот Mercedes',
    dropInfo: { isDroppable: true, dropLimit: 180, year: 2024 }
  },
  { 
    id: '13', 
    name: 'Pierre Gasly', 
    team: 'Alpine', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/gasly/gasly-1.png',
    description: 'Французский гонщик, победитель Гран-при Италии 2020',
    dropInfo: { isDroppable: true, dropLimit: 190, year: 2024 }
  },
  { 
    id: '14', 
    name: 'Nico Hulkenberg', 
    team: 'Haas', 
    rarity: 'hard', 
    type: 'driver', 
    image: '/image/cards/drivers/hulkenberg/hulkenberg-1.png',
    description: 'Опытный немецкий гонщик',
    dropInfo: { isDroppable: true, dropLimit: 280, year: 2024 }
  },
  { 
    id: '15', 
    name: 'Liam Lawson', 
    team: 'Racing Bulls', 
    rarity: 'hard', 
    type: 'driver', 
    image: '/image/cards/drivers/lawson/lawson-1.png',
    description: 'Перспективный новозеландский гонщик',
    dropInfo: { isDroppable: true, dropLimit: 320, year: 2024 }
  },
  { 
    id: '16', 
    name: 'Kevin Magnussen', 
    team: 'Haas', 
    rarity: 'hard', 
    type: 'driver', 
    image: '/image/cards/drivers/magnussen/magnussen-1.png',
    description: 'Датский гонщик, известный агрессивным стилем',
    dropInfo: { isDroppable: true, dropLimit: 290, year: 2024 }
  },
  { 
    id: '17', 
    name: 'Esteban Ocon', 
    team: 'Alpine', 
    rarity: 'medium', 
    type: 'driver', 
    image: '/image/cards/drivers/ocon/ocon-1.png',
    description: 'Французский гонщик, победитель Гран-при Венгрии 2021',
    dropInfo: { isDroppable: true, dropLimit: 210, year: 2024 }
  },
  { 
    id: '18', 
    name: 'Yuki Tsunoda', 
    team: 'Racing Bulls', 
    rarity: 'medium', 
    type: 'driver', 
    image: '/image/cards/drivers/tsunoda/tsunoda-1.png',
    description: 'Японский гонщик, известный эмоциональными радиопереговорами',
    dropInfo: { isDroppable: true, dropLimit: 230, year: 2024 }
  },
  { 
    id: '19', 
    name: 'Franco Colapinto', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'driver', 
    image: '/image/cards/drivers/colapinto/colapinto-1.png',
    description: 'Молодой аргентинский гонщик',
    dropInfo: { isDroppable: true, dropLimit: 300, year: 2024 }
  },
  { 
    id: '20', 
    name: 'Zhou Guanyu', 
    team: 'Sauber', 
    rarity: 'hard', 
    type: 'driver', 
    image: '/image/cards/drivers/zhou/zhou-1.png',
    description: 'Первый китайский гонщик в истории Формулы 1',
    dropInfo: { isDroppable: true, dropLimit: 310, year: 2024 }
  },

  // ДУЭТЫ (duo)
  { 
    id: '101', 
    name: 'Verstappen & Pérez', 
    team: 'Red Bull', 
    rarity: 'ultrasoft', 
    type: 'duo', 
    image: '/image/cards/duos/redbull-duo-1.png',
    description: 'Непобедимый дуэт Red Bull Racing',
    dropInfo: { isDroppable: true, dropLimit: 50, year: 2024 }
  },
  { 
    id: '102', 
    name: 'Hamilton & Russell', 
    team: 'Mercedes', 
    rarity: 'supersoft', 
    type: 'duo', 
    image: '/image/cards/duos/mercedes-duo-1.png',
    description: 'Британский дуэт Mercedes',
    dropInfo: { isDroppable: true, dropLimit: 75, year: 2024 }
  },
  { 
    id: '103', 
    name: 'Leclerc & Sainz', 
    team: 'Ferrari', 
    rarity: 'supersoft', 
    type: 'duo', 
    image: '/image/cards/duos/ferrari-duo-1.png',
    description: 'Огненный дуэт Скудерии',
    dropInfo: { isDroppable: true, dropLimit: 80, year: 2024 }
  },
  { 
    id: '104', 
    name: 'Norris & Piastri', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'duo', 
    image: '/image/cards/duos/mclaren-duo-1.png',
    description: 'Молодежный дуэт McLaren',
    dropInfo: { isDroppable: true, dropLimit: 100, year: 2024 }
  },

  // КОМАНДЫ (team)
  { 
    id: '201', 
    name: 'Red Bull Racing Honda RBPT', 
    team: 'Red Bull', 
    rarity: 'ultrasoft', 
    type: 'team', 
    image: '/image/cards/teams/redbull-1.png',
    description: 'Чемпионская команда конструкторов',
    dropInfo: { isDroppable: true, dropLimit: 60, year: 2024 }
  },
  { 
    id: '202', 
    name: 'Mercedes-AMG Petronas F1', 
    team: 'Mercedes', 
    rarity: 'supersoft', 
    type: 'team', 
    image: '/image/cards/teams/mercedes-1.png',
    description: 'Серебряные стрелы - 8-кратные чемпионы',
    dropInfo: { isDroppable: true, dropLimit: 80, year: 2024 }
  },
  { 
    id: '203', 
    name: 'Scuderia Ferrari', 
    team: 'Ferrari', 
    rarity: 'supersoft', 
    type: 'team', 
    image: '/image/cards/teams/ferrari-1.png',
    description: 'Самая титулованная команда в истории Ф1',
    dropInfo: { isDroppable: true, dropLimit: 70, year: 2024 }
  },
  { 
    id: '204', 
    name: 'McLaren F1 Team', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'team', 
    image: '/image/cards/teams/mclaren-1.png',
    description: 'Легендарная британская команда',
    dropInfo: { isDroppable: true, dropLimit: 100, year: 2024 }
  },
  { 
    id: '205', 
    name: 'Aston Martin Aramco', 
    team: 'Aston Martin', 
    rarity: 'medium', 
    type: 'team', 
    image: '/image/cards/teams/astonmartin-1.png',
    description: 'Амбициозная британская команда',
    dropInfo: { isDroppable: true, dropLimit: 120, year: 2024 }
  },

  // РУКОВОДИТЕЛИ КОМАНД (team_principal)
  { 
    id: '301', 
    name: 'Christian Horner', 
    team: 'Red Bull', 
    rarity: 'ultrasoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/horner-1.png',
    description: 'Руководитель чемпионской команды Red Bull',
    dropInfo: { isDroppable: true, dropLimit: 40, year: 2024 }
  },
  { 
    id: '302', 
    name: 'Toto Wolff', 
    team: 'Mercedes', 
    rarity: 'supersoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/wolff-1.png',
    description: 'Легендарный босс Mercedes F1',
    dropInfo: { isDroppable: true, dropLimit: 50, year: 2024 }
  },
  { 
    id: '303', 
    name: 'Fred Vasseur', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'team_principal', 
    image: '/image/cards/principals/vasseur-1.png',
    description: 'Новый руководитель Scuderia Ferrari',
    dropInfo: { isDroppable: true, dropLimit: 60, year: 2024 }
  },

  // БОЛИДЫ (car)
  { 
    id: '401', 
    name: 'Red Bull RB20', 
    team: 'Red Bull', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/rb20-1.png',
    description: 'Доминирующий болид сезона 2024',
    dropInfo: { isDroppable: true, dropLimit: 80, year: 2024 }
  },
  { 
    id: '402', 
    name: 'Mercedes W15', 
    team: 'Mercedes', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/w15-1.png',
    description: 'Возрождение серебряных стрел',
    dropInfo: { isDroppable: true, dropLimit: 100, year: 2024 }
  },
  { 
    id: '403', 
    name: 'Ferrari SF-24', 
    team: 'Ferrari', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/sf24-1.png',
    description: 'Красивый и быстрый болид Ferrari',
    dropInfo: { isDroppable: true, dropLimit: 90, year: 2024 }
  },
  { 
    id: '404', 
    name: 'McLaren MCL38', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/mcl38-1.png',
    description: 'Прорыв McLaren в топ команды',
    dropInfo: { isDroppable: true, dropLimit: 120, year: 2024 }
  },

  // ТРАССЫ (track)
  { 
    id: '501', 
    name: 'Monaco GP', 
    rarity: 'ultrasoft', 
    type: 'track', 
    image: '/image/cards/tracks/monaco-1.png',
    description: 'Жемчужина календаря Формулы 1',
    dropInfo: { isDroppable: true, dropLimit: 60, year: 2024 }
  },
  { 
    id: '502', 
    name: 'Silverstone Circuit', 
    rarity: 'supersoft', 
    type: 'track', 
    image: '/image/cards/tracks/silverstone-1.png',
    description: 'Домашняя трасса Формулы 1',
    dropInfo: { isDroppable: true, dropLimit: 80, year: 2024 }
  },
  { 
    id: '503', 
    name: 'Spa-Francorchamps', 
    rarity: 'supersoft', 
    type: 'track', 
    image: '/image/cards/tracks/spa-1.png',
    description: 'Легендарная трасса в Арденнах',
    dropInfo: { isDroppable: true, dropLimit: 70, year: 2024 }
  },
  { 
    id: '504', 
    name: 'Suzuka Circuit', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/suzuka-1.png',
    description: 'Техническая трасса-восьмерка',
    dropInfo: { isDroppable: true, dropLimit: 100, year: 2024 }
  },
  { 
    id: '505', 
    name: 'Monza Circuit', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/monza-1.png',
    description: 'Храм скорости в Италии',
    dropInfo: { isDroppable: true, dropLimit: 120, year: 2024 }
  },

  // КОЛЛАБОРАЦИИ (collab)
  { 
    id: '601', 
    name: 'F1 x Netflix Drive to Survive', 
    rarity: 'wet', 
    type: 'collab', 
    image: '/image/cards/collabs/netflix-1.png',
    description: 'Эксклюзивная коллаборация с Netflix',
    dropInfo: { isDroppable: true, dropLimit: 30, year: 2024 }
  },
  { 
    id: '602', 
    name: 'F1 x EA Sports', 
    rarity: 'soft', 
    type: 'collab', 
    image: '/image/cards/collabs/ea-sports-1.png',
    description: 'Партнерство с EA Sports F1',
    dropInfo: { isDroppable: true, dropLimit: 100, year: 2024 }
  },

  // ИСТОРИЧЕСКИЕ (historical)
  { 
    id: '701', 
    name: 'Ayrton Senna Legend', 
    team: 'McLaren', 
    rarity: 'ultrasoft', 
    type: 'historical', 
    image: '/image/cards/historical/senna-1.png',
    description: 'Величайший пилот всех времен',
    dropInfo: { isDroppable: true, dropLimit: 25, year: 2024 }
  },
  { 
    id: '702', 
    name: 'Michael Schumacher Era', 
    team: 'Ferrari', 
    rarity: 'ultrasoft', 
    type: 'historical', 
    image: '/image/cards/historical/schumacher-1.png',
    description: 'Эра господства Kaiser Michael',
    dropInfo: { isDroppable: true, dropLimit: 30, year: 2024 }
  },
  { 
    id: '703', 
    name: 'Niki Lauda Comeback', 
    team: 'Ferrari', 
    rarity: 'supersoft', 
    type: 'historical', 
    image: '/image/cards/historical/lauda-1.png',
    description: 'Невероятное возвращение Лауды',
    dropInfo: { isDroppable: true, dropLimit: 40, year: 2024 }
  },

  // РЕЗУЛЬТАТЫ ГОНОК (race_results)
  { 
    id: '801', 
    name: 'Monaco GP 2024 Victory', 
    rarity: 'ultrasoft', 
    type: 'race_results', 
    image: '/image/cards/race_results/monaco-2024-1.png',
    description: 'Победа в Монако 2024',
    dropInfo: { isDroppable: true, dropLimit: 35, year: 2024 }
  },
  { 
    id: '802', 
    name: 'Silverstone GP 2024 Victory', 
    rarity: 'supersoft', 
    type: 'race_results', 
    image: '/image/cards/race_results/silverstone-2024-1.png',
    description: 'Домашняя победа в Британии',
    dropInfo: { isDroppable: true, dropLimit: 50, year: 2024 }
  },

  // ЛИМИТИРОВАННЫЕ (limited)
  { 
    id: '901', 
    name: 'Championship Trophy 2024', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/trophy-2024-1.png',
    description: 'Эксклюзивный трофей чемпиона',
    dropInfo: { isDroppable: true, dropLimit: 10, year: 2024 }
  },
  { 
    id: '902', 
    name: 'Golden Steering Wheel', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/golden-wheel-1.png',
    description: 'Золотой руль лучшего пилота',
    dropInfo: { isDroppable: true, dropLimit: 15, year: 2024 }
  },

  // ОСОБЫЕ (special)
  { 
    id: '1001', 
    name: 'Diamond Helmet Special', 
    rarity: 'wet', 
    type: 'special', 
    image: '/image/cards/special/diamond-helmet-1.png',
    description: 'Алмазный шлем - особая награда',
    dropInfo: { isDroppable: true, dropLimit: 5, year: 2024 }
  },
  { 
    id: '1002', 
    name: 'Pole Position Master', 
    rarity: 'intermediate', 
    type: 'special', 
    image: '/image/cards/special/pole-master-1.png',
    description: 'Мастер квалификаций',
    dropInfo: { isDroppable: true, dropLimit: 20, year: 2024 }
  },
  { 
    id: '1003', 
    name: 'Speed Demon', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/special/speed-demon-1.png',
    description: 'Демон скорости на трассе',
    dropInfo: { isDroppable: true, dropLimit: 50, year: 2024 }
  },
];