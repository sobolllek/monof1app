
import { useState } from 'react';
import { ArrowLeft, Map, Flag, Star, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

const RacerMap = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('europe');
  const { isTelegramWebApp } = useTelegramWebApp();

  const regions = [
    { id: 'europe', name: 'Европа', progress: 85 },
    { id: 'asia', name: 'Азия', progress: 60 },
    { id: 'americas', name: 'Америка', progress: 45 },
    { id: 'middle-east', name: 'Ближний Восток', progress: 30 }
  ];

  const tracks = [
    {
      name: 'Monaco GP',
      country: 'Монако',
      flag: '🇲🇨',
      isUnlocked: true,
      isCompleted: true,
      visa: true,
      drivers: ['Leclerc', 'Verstappen'],
      teams: ['Ferrari', 'Red Bull'],
      rarity: 'legendary'
    },
    {
      name: 'Silverstone',
      country: 'Великобритания',
      flag: '🇬🇧',
      isUnlocked: true,
      isCompleted: true,
      visa: true,
      drivers: ['Hamilton', 'Russell'],
      teams: ['Mercedes'],
      rarity: 'epic'
    },
    {
      name: 'Spa-Francorchamps',
      country: 'Бельгия',
      flag: '🇧🇪',
      isUnlocked: true,
      isCompleted: false,
      visa: false,
      drivers: [],
      teams: [],
      rarity: 'epic'
    },
    {
      name: 'Secret Circuit X',
      country: '???',
      flag: '❓',
      isUnlocked: false,
      isCompleted: false,
      visa: false,
      drivers: [],
      teams: [],
      rarity: 'secret'
    }
  ];

  const visas = [
    { country: 'Монако', flag: '🇲🇨', collected: true },
    { country: 'Великобритания', flag: '🇬🇧', collected: true },
    { country: 'Бельгия', flag: '🇧🇪', collected: false },
    { country: 'Нидерланды', flag: '🇳🇱', collected: true },
    { country: 'Италия', flag: '🇮🇹', collected: false },
    { country: 'Испания', flag: '🇪🇸', collected: true }
  ];

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-f1-gray/95 backdrop-blur-lg border-b border-f1-gray-light/50">
        <div className="flex items-center gap-3">
          {!isTelegramWebApp && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-gray-800/50 transition-colors"
            >
              <ArrowLeft className="text-white" size={20} />
            </button>
          )}
          <h1 className="text-xl font-bold text-white">Карта Гонщика</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">
            Общий прогресс: <span className="text-white font-semibold">67%</span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Interactive Globe */}
        <Card className="f1-card p-6">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Map className="text-f1-red" size={20} />
              Интерактивный глобус
            </h3>
            <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-900/30 via-gray-900 to-green-900/30 rounded-full overflow-hidden mb-4 border-4 border-gray-700/50">
              {/* Globe background with grid lines */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent">
                {/* Vertical grid lines */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-gray-600/30"
                    style={{ left: `${12.5 + i * 12.5}%` }}
                  />
                ))}
                {/* Horizontal grid lines */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full h-px bg-gray-600/30"
                    style={{ top: `${16.6 + i * 16.6}%` }}
                  />
                ))}
              </div>

              {/* Animated flags on the globe */}
              <div className="absolute top-1/4 left-1/3 animate-pulse cursor-pointer group">
                <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs">
                  🇲🇨
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                    Monaco GP ✓
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-1/4 animate-pulse cursor-pointer group">
                <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs">
                  🇬🇧
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                    Silverstone ✓
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 left-1/3 animate-pulse cursor-pointer group">
                <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs">
                  🇧🇪
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                    Spa-Francorchamps
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/3 cursor-pointer group opacity-50">
                <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-gray-500 flex items-center justify-center text-xs">
                  <Lock size={12} className="text-gray-300" />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                    Секретная трасса 🔒
                  </div>
                </div>
              </div>

              {/* Connecting routes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 33% 25% Q 40% 20% 25% 33%"
                  stroke="rgba(239, 68, 68, 0.6)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                <path
                  d="M 25% 33% Q 30% 40% 33% 33%"
                  stroke="rgba(34, 197, 94, 0.6)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Globe rotation hint */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-black/70 rounded-lg p-2">
                  <div className="text-xs text-gray-300 flex items-center gap-2">
                    <div className="animate-spin">🌍</div>
                    <span>Перетащите для поворота</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/70 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-white">Завершено</span>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full ml-2"></div>
                    <span className="text-white">В процессе</span>
                    <div className="w-3 h-3 bg-red-600 opacity-50 rounded-full ml-2"></div>
                    <span className="text-white">Заблокировано</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Нажмите на флаги для подробной информации
              </p>
              <Button variant="outline" size="sm" className="text-f1-red border-f1-red hover:bg-f1-red hover:text-white">
                Полноэкранный режим
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Region Progress */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4">Прогресс по регионам</h3>
            <div className="space-y-3">
              {regions.map((region) => (
                <div key={region.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{region.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-f1-red h-2 rounded-full transition-all duration-500"
                        style={{ width: `${region.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold text-sm">{region.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Track Details */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4">Детали трасс</h3>
            <div className="space-y-3">
              {tracks.map((track, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  track.isUnlocked ? 'bg-gray-800/30' : 'bg-gray-800/10'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{track.flag}</span>
                      <div>
                        <h4 className={`font-semibold ${track.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                          {track.name}
                        </h4>
                        <p className="text-sm text-gray-400">{track.country}</p>
                      </div>
                      {track.rarity === 'legendary' && <span className="text-yellow-400">⭐</span>}
                      {track.rarity === 'epic' && <span className="text-purple-400">💎</span>}
                      {track.rarity === 'secret' && <span className="text-red-400">🔒</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {track.visa && <span className="text-green-400">📄</span>}
                      {track.isCompleted && <span className="text-green-400">✅</span>}
                      {!track.isUnlocked && <Lock size={16} className="text-gray-500" />}
                    </div>
                  </div>
                  
                  {track.isUnlocked && (
                    <div className="text-xs text-gray-400">
                      Пилоты: {track.drivers.length > 0 ? track.drivers.join(', ') : 'Не собраны'}
                      <br />
                      Команды: {track.teams.length > 0 ? track.teams.join(', ') : 'Не собраны'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visa Collection */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="text-f1-orange" size={20} />
              <h3 className="text-white font-semibold">Коллекция виз</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {visas.map((visa, index) => (
                <div key={index} className={`p-3 rounded-lg text-center ${
                  visa.collected ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-800/30'
                }`}>
                  <div className="text-2xl mb-1">{visa.flag}</div>
                  <div className={`text-xs ${visa.collected ? 'text-green-400' : 'text-gray-500'}`}>
                    {visa.country}
                  </div>
                  {visa.collected && (
                    <div className="text-green-400 text-xs mt-1">✓</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Собрано виз: <span className="text-white font-semibold">4/6</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Secret Achievement */}
        <Card className="f1-card p-4 border border-red-500/30">
          <CardContent className="p-0">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-white font-semibold mb-2">Секретная трасса</h3>
              <p className="text-gray-400 text-sm mb-4">
                Достигните 100% прогресса для разблокировки секретной трассы
              </p>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-f1-red to-red-600 h-3 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">67% / 100%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RacerMap;
