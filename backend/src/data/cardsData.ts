export type Rarity = 'ultrasoft' | 'supersoft' | 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
export type CardType = 'driver' | 'duo' | 'team' | 'team_principal' | 'track' | 'car' | 'collab' | 'historical' | 'race_results' | 'limited' | 'special';
export type Team = 
  | 'Red Bull' | 'Ferrari' | 'Mercedes' | 'McLaren' | 'Aston Martin' 
  | 'Alpine' | 'Williams' | 'Racing Bulls' | 'Sauber' | 'Haas' | 'Maserati' 
  | 'March' | 'Surtees' | 'Toro Rosso' | 'Lotus' | 'Tyrrell' | 'Brabham';

export interface CardData {
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

export const cardsData: CardData[] = [
  { 
    id: '1', 
    name: 'Max Verstappen', 
    team: 'Red Bull', 
    rarity: 'intermediate', 
    type: 'driver', 
    image: '/image/cards/drivers/verstappen-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 100, year: 2024 }
  },
  { 
    id: '2', 
    name: 'Charles Leclerc', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/leclerc-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 150, year: 2024 }
  },
  { 
    id: '3', 
    name: 'Sergio Perez', 
    team: 'Red Bull', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/perez-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 200, year: 2024 }
  },
  { 
    id: '4', 
    name: 'Carlos Sainz Jr.', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/sainz-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 160, year: 2024 }
  },
  { 
    id: '5', 
    name: 'Lando Norris', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/norris-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 180, year: 2024 }
  },
  { 
    id: '6', 
    name: 'Lewis Hamilton', 
    team: 'Mercedes', 
    rarity: 'intermediate', 
    type: 'driver', 
    image: '/image/cards/drivers/hamilton-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 120, year: 2024 }
  },
  { 
    id: '7', 
    name: 'Oscar Piastri', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/piastri-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 200, year: 2024 }
  },
  { 
    id: '8', 
    name: 'Fernando Alonso', 
    team: 'Aston Martin', 
    rarity: 'intermediate', 
    type: 'driver', 
    image: '/image/cards/drivers/alonso-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 130, year: 2024 }
  },
  { 
    id: '9', 
    name: 'Lance Stroll', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/stroll-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 220, year: 2024 }
  },
  { 
    id: '10', 
    name: 'Esteban Ocon', 
    team: 'Alpine', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/ocon-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 210, year: 2024 }
  },
  { 
    id: '11', 
    name: 'Alexander Albon', 
    team: 'Williams', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/albon-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 190, year: 2024 }
  },
  { 
    id: '12', 
    name: 'Franco Colapinto', 
    team: 'Williams', 
    rarity: 'ultrasoft', 
    type: 'driver', 
    image: '/image/cards/drivers/colapinto-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 300, year: 2024 }
  },
  { 
    id: '13', 
    name: 'Liam Lawson', 
    team: 'Racing Bulls', 
    rarity: 'ultrasoft', 
    type: 'driver', 
    image: '/image/cards/drivers/lawson-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 320, year: 2024 }
  },
  { 
    id: '14', 
    name: 'George Russell', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'driver', 
    image: '/image/cards/drivers/russell-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 170, year: 2024 }
  },
  { 
    id: '15', 
    name: 'Pierre Gasly', 
    team: 'Alpine', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/gasly-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 200, year: 2024 }
  },
  { 
    id: '16', 
    name: 'Yuki Tsunoda', 
    team: 'Racing Bulls', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/tsunoda-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 230, year: 2024 }
  },
  { 
    id: '17', 
    name: 'Valtteri Bottas', 
    team: 'Sauber', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/bottas-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 240, year: 2024 }
  },
  { 
    id: '18', 
    name: 'Guanyu Zhou', 
    team: 'Sauber', 
    rarity: 'ultrasoft', 
    type: 'driver', 
    image: '/image/cards/drivers/zhou-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 310, year: 2024 }
  },
  { 
    id: '19', 
    name: 'Kevin Magnussen', 
    team: 'Haas', 
    rarity: 'ultrasoft', 
    type: 'driver', 
    image: '/image/cards/drivers/magnussen-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 290, year: 2024 }
  },
  { 
    id: '20', 
    name: 'Nico Hulkenberg', 
    team: 'Haas', 
    rarity: 'supersoft', 
    type: 'driver', 
    image: '/image/cards/drivers/hulkenberg-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 280, year: 2024 }
  },
  // ===== DUOS ===== (21-30)
  { 
    id: '21', 
    name: 'Leclerc • Sainz', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'duo', 
    image: '/image/cards/duos/ferrari-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 80, year: 2024 }
  },
  { 
    id: '22', 
    name: 'Hamilton • Russell', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'duo', 
    image: '/image/cards/duos/mercedes-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 90, year: 2024 }
  },
  { 
    id: '23', 
    name: 'Norris • Piastri', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'duo', 
    image: '/image/cards/duos/mclaren-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 100, year: 2024 }
  },
  { 
    id: '24', 
    name: 'Gasly • Ocon', 
    team: 'Alpine', 
    rarity: 'ultrasoft', 
    type: 'duo', 
    image: '/image/cards/duos/alpine-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 150, year: 2024 }
  },
  { 
    id: '25', 
    name: 'Alonso • Stroll', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'duo', 
    image: '/image/cards/duos/aston-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 120, year: 2024 }
  },
  { 
    id: '26', 
    name: 'Albon • Colapinto', 
    team: 'Williams', 
    rarity: 'supersoft', 
    type: 'duo', 
    image: '/image/cards/duos/williams-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 140, year: 2024 }
  },
  { 
    id: '27', 
    name: 'Tsunoda • Lawson', 
    team: 'Racing Bulls', 
    rarity: 'ultrasoft', 
    type: 'duo', 
    image: '/image/cards/duos/rb-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 160, year: 2024 }
  },
  { 
    id: '28', 
    name: 'Verstappen • Perez', 
    team: 'Red Bull', 
    rarity: 'soft', 
    type: 'duo', 
    image: '/image/cards/duos/redbull-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 70, year: 2024 }
  },
  { 
    id: '29', 
    name: 'Bottas • Zhou', 
    team: 'Sauber', 
    rarity: 'ultrasoft', 
    type: 'duo', 
    image: '/image/cards/duos/sauber-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 180, year: 2024 }
  },
  { 
    id: '30', 
    name: 'Magnussen • Hulkenberg', 
    team: 'Haas', 
    rarity: 'supersoft', 
    type: 'duo', 
    image: '/image/cards/duos/haas-duo-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 130, year: 2024 }
  },
  // ===== TEAMS ===== (31-40)
  { 
    id: '31', 
    name: 'LEC • SAI • Vasseur', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'team', 
    image: '/image/cards/teams/ferrari-team-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 70, year: 2024 }
  },
  { 
    id: '32', 
    name: 'HAM • RUS • Wolff', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'team', 
    image: '/image/cards/teams/mercedes-team-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 80, year: 2024 }
  },
  { 
    id: '33', 
    name: 'NOR • PIA • Stella', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'team', 
    image: '/image/cards/teams/mclaren-team-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 90, year: 2024 }
  },
  { 
    id: '34', 
    name: 'ALO • STR • Krack', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'team', 
    image: '/image/cards/teams/aston-team-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 110, year: 2024 }
  },
  { 
    id: '35', 
    name: 'VER • PER • Horner', 
    team: 'Red Bull', 
    rarity: 'soft', 
    type: 'team', 
    image: '/image/cards/teams/redbull-team-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 60, year: 2024 }
  },
  { 
    id: '36', 
    name: 'ALB • COL • Vowles', 
    team: 'Williams', 
    rarity: 'supersoft', 
    type: 'team', 
    image: '/image/cards/teams/williams-team-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 120, year: 2024 }
  },
  { 
    id: '37', 
    name: 'GAS • OCO • Oakes', 
    team: 'Alpine', 
    rarity: 'ultrasoft', 
    type: 'team', 
    image: '/image/cards/teams/alpine-team-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 150, year: 2024 }
  },
  { 
    id: '38', 
    name: 'TSU • LAW • Mekies', 
    team: 'Racing Bulls', 
    rarity: 'ultrasoft', 
    type: 'team', 
    image: '/image/cards/teams/rb-team-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 160, year: 2024 }
  },
  { 
    id: '39', 
    name: 'BOT • ZHO • Bravi', 
    team: 'Sauber', 
    rarity: 'ultrasoft', 
    type: 'team', 
    image: '/image/cards/teams/sauber-team-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 170, year: 2024 }
  },
  { 
    id: '40', 
    name: 'MAG • HUL • Komatsu', 
    team: 'Haas', 
    rarity: 'supersoft', 
    type: 'team', 
    image: '/image/cards/teams/haas-team-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 130, year: 2024 }
  },
  // ===== TEAM PRINCIPALS ===== (41-50)
  { 
    id: '41', 
    name: 'Frederic Vasseur', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'team_principal', 
    image: '/image/cards/principals/vasseur-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 60, year: 2024 }
  },
  { 
    id: '42', 
    name: 'Toto Wolff', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'team_principal', 
    image: '/image/cards/principals/wolff-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 50, year: 2024 }
  },
  { 
    id: '43', 
    name: 'Andrea Stella', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'team_principal', 
    image: '/image/cards/principals/stella-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 70, year: 2024 }
  },
  { 
    id: '44', 
    name: 'Oliver Oakes', 
    team: 'Alpine', 
    rarity: 'ultrasoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/oakes-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 140, year: 2024 }
  },
  { 
    id: '45', 
    name: 'Mike Krack', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/krack-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 110, year: 2024 }
  },
  { 
    id: '46', 
    name: 'James Vowles', 
    team: 'Williams', 
    rarity: 'supersoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/vowles-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 120, year: 2024 }
  },
  { 
    id: '47', 
    name: 'Laurent Mekies', 
    team: 'Racing Bulls', 
    rarity: 'ultrasoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/mekies-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 150, year: 2024 }
  },
  { 
    id: '48', 
    name: 'Christian Horner', 
    team: 'Red Bull', 
    rarity: 'soft', 
    type: 'team_principal', 
    image: '/image/cards/principals/horner-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 40, year: 2024 }
  },
  { 
    id: '49', 
    name: 'Ayao Komatsu', 
    team: 'Haas', 
    rarity: 'supersoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/komatsu-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 130, year: 2024 }
  },
  { 
    id: '50', 
    name: 'Alessandro Alunni Bravi', 
    team: 'Sauber', 
    rarity: 'ultrasoft', 
    type: 'team_principal', 
    image: '/image/cards/principals/bravi-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 160, year: 2024 }
  },
  // ===== TRACKS ===== (51-72)
  { 
    id: '51', 
    name: 'Jeddah Corniche Circuit | Saudi Arabia', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/jeddah-1.png',
    description: 'Самая длинная и быстрая городская трасса в календаре F1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '52', 
    name: 'Bahrain International Circuit | Bahrain', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/bahrain-1.png',
    description: 'Открыт в 2004 году. Известен своими длинными прямыми и жарким климатом',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '53', 
    name: 'Albert Park Circuit | Australia', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/australia-1.png',
    description: 'Полупостоянная трасса в Мельбурне. Сочетает элементы городской и стационарной трассы',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '54', 
    name: 'Suzuka International Racing Course | Japan', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/suzuka-1.png',
    description: 'Одна из самых технически сложных трасс. Уникальная "восьмерка"',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '55', 
    name: 'Shanghai International Circuit | China', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/china-1.png',
    description: 'Известна дизайном, напоминающим китайский иероглиф "шан"',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '56', 
    name: 'Miami International Autodrome | USA', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/miami-1.png',
    description: 'Новая трасса, дебютировавшая в 2022 году',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '57', 
    name: 'Autodromo Enzo e Dino Ferrari | Italy', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/imola-1.png',
    description: 'Также известна как Имола. Историческая трасса с богатыми традициями',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '58', 
    name: 'Circuit de Monaco | Monaco', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/monaco-1.png',
    description: 'Самая престижная и известная трасса F1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '59', 
    name: 'Circuit de Barcelona-Catalunya | Spain', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/barcelona-1.png',
    description: 'Часто используется для тестов F1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '60', 
    name: 'Circuit Gilles Villeneuve | Canada', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/canada-1.png',
    description: 'Расположена на искусственном острове. Известна "Стеной чемпионов"',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '61', 
    name: 'Red Bull Ring | Austria', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/austria-1.png',
    description: 'Короткая, но быстрая трасса с живописными видами',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '62', 
    name: 'Silverstone Circuit | Great Britain', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/silverstone-1.png',
    description: 'Одна из самых быстрых трасс в календаре',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '63', 
    name: 'Hungaroring | Hungary', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/hungary-1.png',
    description: 'Извилистая трасса, часто сравниваемая с картодромом',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '64', 
    name: 'Circuit de Spa-Francorchamps | Belgium', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/spa-1.png',
    description: 'Одна из самых длинных и быстрых трасс. Включает поворот Eau Rouge',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '65', 
    name: 'Autodromo Nazionale Monza | Italy', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/monza-1.png',
    description: 'Известна как "Храм скорости". Одна из самых быстрых трасс',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '66', 
    name: 'Marina Bay Street Circuit | Singapore', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/singapore-1.png',
    description: 'Первая ночная гонка в истории F1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '67', 
    name: 'Circuit Zandvoort | Netherlands', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/zandvoort-1.png',
    description: 'Историческая трасса, вернувшаяся в календарь F1 в 2021 году',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '68', 
    name: 'Lusail International Circuit | Qatar', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/qatar-1.png',
    description: 'Новая трасса в календаре F1. Изначально построена для мотогонок',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '69', 
    name: 'Circuit of the Americas | USA', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/cota-1.png',
    description: 'Современная трасса, вдохновленная лучшими элементами других трасс F1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '70', 
    name: 'Autódromo Hermanos Rodríguez | Mexico', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/mexico-1.png',
    description: 'Расположена на большой высоте, что влияет на работу двигателей',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '71', 
    name: 'Autódromo José Carlos Pace | Brazil', 
    rarity: 'medium', 
    type: 'track', 
    image: '/image/cards/tracks/brazil-1.png',
    description: 'Также известна как Интерлагос. Одна из немногих трасс против часовой стрелки',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '72', 
    name: 'Las Vegas Strip Circuit | USA', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/vegas-1.png',
    description: 'Новая ночная гонка на улицах Лас-Вегаса',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '73', 
    name: 'Baku City Circuit | Azerbaijan', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/baku-1.png',
    description: 'Городская трасса. Гонка начинается на заходе солнца',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '74', 
    name: 'Yas Marina Circuit | Abu Dhabi', 
    rarity: 'soft', 
    type: 'track', 
    image: '/image/cards/tracks/uae-1.png',
    description: 'Современная трасса, известная своей роскошной инфраструктурой. Гонка начинается днем и заканчивается ночью. Часто является финальным этапом сезона',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  // ===== CARS ===== (75-84) 2024 models
  { 
    id: '75', 
    name: 'RB20', 
    team: 'Red Bull', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/redbull-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '76', 
    name: 'W15', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/mercedes-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '77', 
    name: 'SF-24', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/ferrari-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '78', 
    name: 'MCL38', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/mclaren-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '79', 
    name: 'AMR24', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/aston-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '80', 
    name: 'FW46', 
    team: 'Williams', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/williams-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '81', 
    name: 'A524', 
    team: 'Alpine', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/alpine-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '82', 
    name: 'VF-24', 
    team: 'Haas', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/haas-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '83', 
    name: 'VCARB 01', 
    team: 'Racing Bulls', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/rb-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '84', 
    name: 'C44', 
    team: 'Sauber', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/sauber-2024-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  // ===== SPECIAL DRIVERS ===== (85-91)
  { 
    id: '85', 
    name: 'Logan Sargeant', 
    team: 'Williams', 
    rarity: 'wet', 
    type: 'special', 
    image: '/image/cards/special/sargeant-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '86', 
    name: 'Max Verstappen 4 World Champion', 
    team: 'Red Bull', 
    rarity: 'wet', 
    type: 'special', 
    image: '/image/cards/special/verstappen-champ-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '87', 
    name: 'Charles Leclerc the Red Dream', 
    team: 'Ferrari', 
    rarity: 'wet', 
    type: 'special', 
    image: '/image/cards/special/leclerc-special-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '88', 
    name: 'Charles Leclerc the Red Dream (Limited)', 
    team: 'Ferrari', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/special/leclerc-limited-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '89', 
    name: 'Vitaly Petrov', 
    rarity: 'hard', 
    type: 'historical',
    team: 'Lotus',  
    image: '/image/cards/limited/vitali-petrov-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '90', 
    name: 'Daniil Kvyat', 
    rarity: 'hard', 
    type: 'historical',  
    team: 'Toro Rosso',
    image: '/image/cards/limited/kvyat-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '91', 
    name: 'Nico 2025 first podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/special/nico-first-podium.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  // ===== COLLABORATIONS ===== (92-97)
  { 
    id: '92', 
    name: 'Evkus Racing', 
    rarity: 'hard', 
    type: 'collab', 
    image: '/image/cards/collabs/evkus-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '93', 
    name: 'гоночный кринж by dave', 
    rarity: 'hard', 
    type: 'collab', 
    image: '/image/cards/collabs/dave-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '94', 
    name: 'Wall Of Champions', 
    rarity: 'hard', 
    type: 'collab', 
    image: '/image/cards/collabs/wall-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '95', 
    name: 'Royal Motorsport', 
    rarity: 'hard', 
    type: 'collab', 
    image: '/image/cards/collabs/royal-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '96', 
    name: 'Bonsfis', 
    rarity: 'hard', 
    type: 'collab', 
    image: '/image/cards/collabs/bonsfis-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '97', 
    name: 'Better Call Hulk', 
    rarity: 'hard', 
    type: 'collab', 
    image: '/image/cards/collabs/hulk-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  // ===== HISTORICAL ===== (98-107)
  { 
    id: '98', 
    name: 'Maria Teresa de Filippis', 
    team: 'Maserati', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/filippis-1.png',
    description: 'Первая женщина-пилот в Формуле 1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '99', 
    name: 'Maria Grazia В«LellaВ» Lombardi', 
    team: 'March', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/lombardi-1.png',
    description: 'Единственная женщина в Формуле 1, заработавшая очки',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '100', 
    name: 'Divina Mary Galica', 
    team: 'Surtees', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/galica-1.png',
    description: 'Выступала в Формуле-1, а так же участвовала в Олимпийских играх',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '101', 
    name: 'Giovanna Amati', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/amati-1.png',
    description: 'Последняя женщина, принимавшая участие в Гран-при Формулы 1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '102', 
    name: 'Desire Wilson', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/wilson-1.png',
    description: 'Единственная женщина, выигравшая гонку в формуле',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '103', 
    name: 'Suzanne Wolff', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/wolff-1.png',
    description: 'Первая за 22 года женщина в Формуле 1, а также директор F1 Academy',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '104', 
    name: 'Laura MГјller', 
    team: 'Haas', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/muller-1.png',
    description: 'Первая женщина-гоночный инженер в Формуле 1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '105', 
    name: 'Monisha Kaltenborn', 
    team: 'Sauber', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/kaltenborn-1.png',
    description: 'Первая женщина-руководитель команды в Формуле-1',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '106', 
    name: 'Claire Victoria Williams', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/williams-1.png',
    description: 'Директор команды Williams Racing',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  { 
    id: '107', 
    name: 'Hannah Schmitz', 
    team: 'Red Bull', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/schmitz-1.png',
    description: 'Стратег команды Oracle Red Bull Racing',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2024 }
  },
  // ===== RACE RESULTS ===== (108-116)
  { 
    id: '108', 
    name: 'Australia 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/australia-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '109', 
    name: 'China 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/china-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '110', 
    name: 'Japan 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/japan-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '111', 
    name: 'Bahrain 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/bahrain-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '112', 
    name: 'Saudi Arabia 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/jeddah-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '113', 
    name: 'Miami 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/miami-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '114', 
    name: 'Emilia-Romagna 2025 podium', 
    rarity: 'hard', 
    type: 'race_results', 
    image: '/image/cards/results/imola-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 50, year: 2025 }
  },
  { 
    id: '115', 
    name: 'Monaco 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/monaco-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '116', 
    name: 'Barcelona 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/barcelona-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '117', 
    name: 'Canada 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/canada-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '118', 
    name: 'Austria 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/austria-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '119', 
    name: 'Great Britain 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/greatbritain-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '120', 
    name: 'Belgium 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/belgium-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '121', 
    name: 'Hungary 2025 podium', 
    rarity: 'hard', 
    type: 'race_results',  
    image: '/image/cards/results/hungary-win-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '122', 
    name: 'Bahrain Shakedown 2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/bahrain-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '123', 
    name: 'Australia GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/australia-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '124', 
    name: 'China GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/china-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '125', 
    name: 'Japan GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/japan-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '126', 
    name: 'Bahrain GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/bahrain-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '127', 
    name: 'Saudi Arabia GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/jeddah-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '128', 
    name: 'Miami GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/miami-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 10, year: 2025 }
  },
  { 
    id: '129', 
    name: 'Emilia-Romagna GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/imola-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 15, year: 2025 }
  },
  { 
    id: '130', 
    name: 'Monaco GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/monaco-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '131', 
    name: 'Barcelona GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/barcelona-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '132', 
    name: 'Canada GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/canada-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '133', 
    name: 'Austria GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/austria-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '134', 
    name: 'Great Britain GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/greatbritain-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '135', 
    name: 'Belgium GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/belgium-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '136', 
    name: 'Hungary GP2025', 
    rarity: 'wet', 
    type: 'limited', 
    image: '/image/cards/limited/hungary-gp-2025-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2025 }
  },
  { 
    id: '137', 
    name: 'Special livery Japan RBR', 
    team: 'Red Bull', 
    rarity: 'medium', 
    type: 'car', 
    image: '/image/cards/special/redbull-japan-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '138', 
    name: 'Special livery Japan HAAS', 
    team: 'Haas', 
    rarity: 'medium', 
    type: 'car', 
    image: '/image/cards/special/haas-japan-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '139', 
    name: 'Special livery Miami Ferrari', 
    team: 'Ferrari', 
    rarity: 'medium', 
    type: 'car', 
    image: '/image/cards/special/ferrari-miami-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '140', 
    name: 'Special livery Miami Sauber', 
    team: 'Sauber', 
    rarity: 'medium', 
    type: 'car', 
    image: '/image/cards/special/sauber-miami-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '141', 
    name: 'Special livery Miami RB', 
    team: 'Racing Bulls', 
    rarity: 'medium', 
    type: 'car', 
    image: '/image/cards/special/rb-miami-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2025 }
  },
  { 
    id: '142', 
    name: 'Valentine Max', 
    team: 'Red Bull', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/verstappen-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '143', 
    name: 'Valentine Carlos', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/sainz-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '144', 
    name: 'Valentine Charles', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/leclerc-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '145', 
    name: 'Valentine Max [National Sounds]', 
    team: 'Red Bull', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/verstappen-v1-2.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '146', 
    name: 'Valentine Lando', 
    team: 'McLaren', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/norris-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '147', 
    name: 'Valentine Charles [Surname Love]', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/leclerc-v1-2.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '148', 
    name: 'Valentine Daniel', 
    team: 'Racing Bulls', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/ricciardo-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '149', 
    name: 'Valentine Franco', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/colapinto-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '150', 
    name: 'Valentine Logan', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/sargeant-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '151', 
    name: 'Valentine Charles [LV Edition]', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/leclerc-v1-3.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '152', 
    name: 'Valentine Fernando', 
    team: 'Aston Martin', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/alonso-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '153', 
    name: 'Valentine Nico', 
    team: 'Haas', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/hulkenberg-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '154', 
    name: 'Valentine Oscar', 
    team: 'McLaren', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/piastri-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '155', 
    name: 'Valentine Kimi', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/raikkonen-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '156', 
    name: 'Valentine Lewis', 
    team: 'Mercedes', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/hamilton-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '157', 
    name: 'Valentine Carlos [Chili Hot]', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/sainz-v1-2.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '158', 
    name: 'Valentine Kevin', 
    team: 'Haas', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/magnussen-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '159', 
    name: 'Valentine Kimi [Ice Ice Baby]', 
    team: 'Ferrari', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/raikkonen-v1-2.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '160', 
    name: 'Valentine Alex', 
    team: 'Williams', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/albon-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '161', 
    name: 'Valentine Tyres', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/valentine/tyres-v1-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '162', 
    name: 'RB21', 
    team: 'Red Bull', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/redbull-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '163', 
    name: 'W16', 
    team: 'Mercedes', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/mercedes-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '164', 
    name: 'SF25', 
    team: 'Ferrari', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/ferrari-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '165', 
    name: 'MCL39', 
    team: 'McLaren', 
    rarity: 'soft', 
    type: 'car', 
    image: '/image/cards/cars/mclaren-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '166', 
    name: 'VF-25', 
    team: 'Haas', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/haas-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '167', 
    name: 'AMR25', 
    team: 'Aston Martin', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/aston-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '168', 
    name: 'A525', 
    team: 'Alpine', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/alpine-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '169', 
    name: 'VCARB02', 
    team: 'Racing Bulls', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/rb-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '170', 
    name: 'FW47', 
    team: 'Williams', 
    rarity: 'supersoft', 
    type: 'car', 
    image: '/image/cards/cars/williams-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '171', 
    name: 'C45', 
    team: 'Sauber', 
    rarity: 'ultrasoft', 
    type: 'car', 
    image: '/image/cards/cars/sauber-2025-1.png',
    description: '',
    dropInfo: { isDroppable: true, dropLimit: 'infinity', year: 2025 }
  },
  { 
    id: '172', 
    name: 'April fools 1', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/special/april-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '173', 
    name: 'April fools 2', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/special/april-2.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '174', 
    name: 'April fools 3', 
    rarity: 'hard', 
    type: 'special', 
    image: '/image/cards/special/april-3.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 0, year: 2024 }
  },
  { 
    id: '175', 
    name: 'Formula One 75', 
    rarity: 'hard', 
    type: 'historical', 
    image: '/image/cards/historical/f1-75-1.png',
    description: '',
    dropInfo: { isDroppable: false, dropLimit: 30, year: 2024 }
  },
];