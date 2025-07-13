
export interface Card {
  id: number;
  name: string;
  team?: string;
  location?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  type: 'driver' | 'car' | 'track';
  image?: string;
}

export const cardsData: Card[] = [
  // Пилоты
  { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', rarity: 'legendary', category: 'drivers', type: 'driver', image: '/image/cards/verstappen/png/verstappen-1.png' },
  { id: 2, name: 'Lewis Hamilton', team: 'Mercedes', rarity: 'epic', category: 'drivers', type: 'driver', image: '/image/cards/hamilton/png/hamilton-1.png' },
  { id: 3, name: 'Charles Leclerc', team: 'Ferrari', rarity: 'epic', category: 'drivers', type: 'driver', image: '/image/cards/leclerc/png/leclerc-1.png' },
  { id: 4, name: 'Lando Norris', team: 'McLaren', rarity: 'rare', category: 'drivers', type: 'driver', image: '/image/cards/norris/png/norris-1.png' },
  { id: 5, name: 'George Russell', team: 'Mercedes', rarity: 'rare', category: 'drivers', type: 'driver', image: '/image/cards/russell/png/russell-1.png' },
  { id: 6, name: 'Carlos Sainz Jr.', team: 'Ferrari', rarity: 'rare', category: 'drivers', type: 'driver', image: '/image/cards/sainz/png/sainz-1.png' },
  { id: 7, name: 'Sergio Perez', team: 'Red Bull Racing', rarity: 'rare', category: 'drivers', type: 'driver', image: '/image/cards/perez/png/perez-1.png' },
  { id: 8, name: 'Fernando Alonso', team: 'Aston Martin', rarity: 'epic', category: 'drivers', type: 'driver', image: '/image/cards/alonso/png/alonso-1.png' },
  { id: 9, name: 'Oscar Piastri', team: 'McLaren', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/piastri/png/piastri-1.png' },
  { id: 10, name: 'Lance Stroll', team: 'Aston Martin', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/stroll/png/stroll-1.png' },
  { id: 11, name: 'Pierre Gasly', team: 'Alpine', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/gasly/png/gasly-1.png' },
  { id: 12, name: 'Esteban Ocon', team: 'Alpine', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/ocon/png/ocon-1.png' },
  { id: 13, name: 'Alex Albon', team: 'Williams', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/albon/png/albon-1.png' },
  { id: 14, name: 'Logan Sargeant', team: 'Williams', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/sargeant/png/sargeant-1.png' },
  { id: 15, name: 'Kevin Magnussen', team: 'Haas F1 Team', rarity: 'common', category: 'drivers', type: 'driver', image: '/image/cards/magnussen/png/magnussen-1.png' },

  // Команды
  { id: 21, name: 'Red Bull Racing Honda RBPT', team: 'Red Bull Racing', rarity: 'legendary', category: 'teams', type: 'driver', image: '/image/cards/teams/png/redbull-1.png' },
  { id: 22, name: 'Mercedes-AMG Petronas F1', team: 'Mercedes', rarity: 'epic', category: 'teams', type: 'driver', image: '/image/cards/teams/png/mercedes-1.png' },
  { id: 23, name: 'Scuderia Ferrari', team: 'Ferrari', rarity: 'epic', category: 'teams', type: 'driver', image: '/image/cards/teams/png/ferrari-1.png' },
  { id: 24, name: 'McLaren F1 Team', team: 'McLaren', rarity: 'rare', category: 'teams', type: 'driver', image: '/image/cards/teams/png/mclaren-1.png' },
  { id: 25, name: 'Aston Martin Aramco', team: 'Aston Martin', rarity: 'rare', category: 'teams', type: 'driver', image: '/image/cards/teams/png/astonmartin-1.png' },
  { id: 26, name: 'BWT Alpine F1 Team', team: 'Alpine', rarity: 'common', category: 'teams', type: 'driver', image: '/image/cards/teams/png/alpine-1.png' },
  { id: 27, name: 'Williams Racing', team: 'Williams', rarity: 'common', category: 'teams', type: 'driver', image: '/image/cards/teams/png/williams-1.png' },
  { id: 28, name: 'Visa RB F1 Team', team: 'RB', rarity: 'common', category: 'teams', type: 'driver', image: '/image/cards/teams/png/rb-1.png' },
  { id: 29, name: 'Stake F1 Team Kick Sauber', team: 'Sauber', rarity: 'common', category: 'teams', type: 'driver', image: '/image/cards/teams/png/sauber-1.png' },
  { id: 30, name: 'MoneyGram Haas F1 Team', team: 'Haas F1 Team', rarity: 'common', category: 'teams', type: 'driver', image: '/image/cards/teams/png/haas-1.png' },
  { id: 31, name: 'Red Bull Powertrains', team: 'Red Bull Racing', rarity: 'rare', category: 'teams', type: 'driver', image: '/image/cards/teams/png/redbull-2.png' },
  { id: 32, name: 'Mercedes HPP', team: 'Mercedes', rarity: 'rare', category: 'teams', type: 'driver', image: '/image/cards/teams/png/mercedes-2.png' },
  { id: 33, name: 'Ferrari Scuderia', team: 'Ferrari', rarity: 'rare', category: 'teams', type: 'driver', image: '/image/cards/teams/png/ferrari-2.png' },

  // Болиды
  { id: 41, name: 'Red Bull RB20', team: 'Red Bull Racing', rarity: 'legendary', category: 'cars', type: 'car', image: '/image/cards/cars/png/rb20-1.png' },
  { id: 42, name: 'Mercedes W15', team: 'Mercedes', rarity: 'epic', category: 'cars', type: 'car', image: '/image/cards/cars/png/w15-1.png' },
  { id: 43, name: 'Ferrari SF-24', team: 'Ferrari', rarity: 'epic', category: 'cars', type: 'car', image: '/image/cards/cars/png/sf24-1.png' },
  { id: 44, name: 'McLaren MCL38', team: 'McLaren', rarity: 'rare', category: 'cars', type: 'car', image: '/image/cards/cars/png/mcl38-1.png' },
  { id: 45, name: 'Aston Martin AMR24', team: 'Aston Martin', rarity: 'rare', category: 'cars', type: 'car', image: '/image/cards/cars/png/amr24-1.png' },
  { id: 46, name: 'Alpine A524', team: 'Alpine', rarity: 'common', category: 'cars', type: 'car', image: '/image/cards/cars/png/a524-1.png' },
  { id: 47, name: 'Williams FW46', team: 'Williams', rarity: 'common', category: 'cars', type: 'car', image: '/image/cards/cars/png/fw46-1.png' },
  { id: 48, name: 'RB VCARB 01', team: 'RB', rarity: 'common', category: 'cars', type: 'car', image: '/image/cards/cars/png/vcarb01-1.png' },
  { id: 49, name: 'Sauber C44', team: 'Sauber', rarity: 'common', category: 'cars', type: 'car', image: '/image/cards/cars/png/c44-1.png' },
  { id: 50, name: 'Haas VF-24', team: 'Haas F1 Team', rarity: 'common', category: 'cars', type: 'car', image: '/image/cards/cars/png/vf24-1.png' },
  { id: 51, name: 'Red Bull RB19', team: 'Red Bull Racing', rarity: 'epic', category: 'cars', type: 'car', image: '/image/cards/cars/png/rb19-1.png' },
  { id: 52, name: 'Ferrari SF-23', team: 'Ferrari', rarity: 'rare', category: 'cars', type: 'car', image: '/image/cards/cars/png/sf23-1.png' },
  { id: 53, name: 'Mercedes W14', team: 'Mercedes', rarity: 'rare', category: 'cars', type: 'car', image: '/image/cards/cars/png/w14-1.png' },

  // Трассы
  { id: 61, name: 'Monaco GP', location: 'Monte Carlo', rarity: 'legendary', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/monaco-1.png' },
  { id: 62, name: 'Silverstone Circuit', location: 'Great Britain', rarity: 'epic', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/silverstone-1.png' },
  { id: 63, name: 'Spa-Francorchamps', location: 'Belgium', rarity: 'epic', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/spa-1.png' },
  { id: 64, name: 'Suzuka Circuit', location: 'Japan', rarity: 'rare', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/suzuka-1.png' },
  { id: 65, name: 'Monza Circuit', location: 'Italy', rarity: 'rare', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/monza-1.png' },
  { id: 66, name: 'Circuit de Barcelona', location: 'Spain', rarity: 'rare', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/barcelona-1.png' },
  { id: 67, name: 'Interlagos', location: 'Brazil', rarity: 'rare', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/interlagos-1.png' },
  { id: 68, name: 'Bahrain International', location: 'Bahrain', rarity: 'common', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/bahrain-1.png' },
  { id: 69, name: 'Circuit Zandvoort', location: 'Netherlands', rarity: 'common', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/zandvoort-1.png' },
  { id: 70, name: 'Miami International', location: 'USA', rarity: 'common', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/miami-1.png' },
  { id: 71, name: 'Las Vegas Strip Circuit', location: 'USA', rarity: 'rare', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/lasvegas-1.png' },
  { id: 72, name: 'Circuit Gilles Villeneuve', location: 'Canada', rarity: 'common', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/montreal-1.png' },
  { id: 73, name: 'Hungaroring', location: 'Hungary', rarity: 'common', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/hungaroring-1.png' },
  { id: 74, name: 'Red Bull Ring', location: 'Austria', rarity: 'rare', category: 'circuits', type: 'track', image: '/image/cards/circuits/png/redbullring-1.png' },

  // История
  { id: 81, name: 'Ayrton Senna Legend', team: 'McLaren', rarity: 'legendary', category: 'history', type: 'driver', image: '/image/cards/history/png/senna-1.png' },
  { id: 82, name: 'Michael Schumacher Era', team: 'Ferrari', rarity: 'legendary', category: 'history', type: 'driver', image: '/image/cards/history/png/schumacher-1.png' },
  { id: 83, name: 'Niki Lauda Comeback', team: 'Ferrari', rarity: 'epic', category: 'history', type: 'driver', image: '/image/cards/history/png/lauda-1.png' },
  { id: 84, name: 'James Hunt Championship', team: 'McLaren', rarity: 'epic', category: 'history', type: 'driver', image: '/image/cards/history/png/hunt-1.png' },
  { id: 85, name: 'Juan Manuel Fangio', team: 'Mercedes', rarity: 'epic', category: 'history', type: 'driver', image: '/image/cards/history/png/fangio-1.png' },
  { id: 86, name: 'Jackie Stewart Triple Crown', team: 'Tyrrell', rarity: 'rare', category: 'history', type: 'driver', image: '/image/cards/history/png/stewart-1.png' },
  { id: 87, name: 'Alain Prost Rivalry', team: 'McLaren', rarity: 'rare', category: 'history', type: 'driver', image: '/image/cards/history/png/prost-1.png' },
  { id: 88, name: 'Graham Hill Legacy', team: 'Lotus', rarity: 'rare', category: 'history', type: 'driver', image: '/image/cards/history/png/hill-1.png' },
  { id: 89, name: 'Jim Clark Dominance', team: 'Lotus', rarity: 'rare', category: 'history', type: 'driver', image: '/image/cards/history/png/clark-1.png' },
  { id: 90, name: 'Alberto Ascari Champion', team: 'Ferrari', rarity: 'common', category: 'history', type: 'driver', image: '/image/cards/history/png/ascari-1.png' },
  { id: 91, name: 'Stirling Moss Icon', team: 'Mercedes', rarity: 'common', category: 'history', type: 'driver', image: '/image/cards/history/png/moss-1.png' },
  { id: 92, name: 'Nelson Piquet Era', team: 'Brabham', rarity: 'common', category: 'history', type: 'driver', image: '/image/cards/history/png/piquet-1.png' },

  // Особые
  { id: 101, name: 'Golden Helmet Special', team: 'Special Edition', rarity: 'legendary', category: 'special', type: 'driver', image: '/image/cards/special/png/golden-helmet-1.png' },
  { id: 102, name: 'Crystal Trophy', team: 'Award Series', rarity: 'legendary', category: 'special', type: 'driver', image: '/image/cards/special/png/crystal-trophy-1.png' },
  { id: 103, name: 'Diamond Race Win', team: 'Achievement', rarity: 'epic', category: 'special', type: 'driver', image: '/image/cards/special/png/diamond-win-1.png' },
  { id: 104, name: 'Platinum Podium', team: 'Milestone', rarity: 'epic', category: 'special', type: 'driver', image: '/image/cards/special/png/platinum-podium-1.png' },
  { id: 105, name: 'Silver Speed Record', team: 'Record Breaker', rarity: 'rare', category: 'special', type: 'driver', image: '/image/cards/special/png/silver-speed-1.png' },
  { id: 106, name: 'Bronze Achievement', team: 'First Win', rarity: 'rare', category: 'special', type: 'driver', image: '/image/cards/special/png/bronze-achievement-1.png' },
  { id: 107, name: 'Rookie of the Year', team: 'Young Talent', rarity: 'rare', category: 'special', type: 'driver', image: '/image/cards/special/png/rookie-year-1.png' },
  { id: 108, name: 'Comeback King', team: 'Inspiration', rarity: 'common', category: 'special', type: 'driver', image: '/image/cards/special/png/comeback-king-1.png' },
  { id: 109, name: 'Team Player Award', team: 'Cooperation', rarity: 'common', category: 'special', type: 'driver', image: '/image/cards/special/png/team-player-1.png' },
  { id: 110, name: 'Fan Favorite', team: 'Popular Choice', rarity: 'common', category: 'special', type: 'driver', image: '/image/cards/special/png/fan-favorite-1.png' },
  { id: 111, name: 'Speed Demon', team: 'Fastest Lap', rarity: 'common', category: 'special', type: 'driver', image: '/image/cards/special/png/speed-demon-1.png' },
  { id: 112, name: 'Pole Position Master', team: 'Qualifying King', rarity: 'rare', category: 'special', type: 'driver', image: '/image/cards/special/png/pole-master-1.png' },
];
