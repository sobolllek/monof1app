
import { useState } from 'react';
import { ArrowLeft, Users, Trophy, Play, Settings, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const TeamManager = () => {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const teams = [
    {
      name: 'Red Bull Racing',
      drivers: ['Max Verstappen', 'Sergio Perez'],
      car: 'RB20',
      isComplete: true,
      championship: 1,
      points: 750,
      wins: 12,
      podiums: 18,
      rarity: 'legendary'
    },
    {
      name: 'McLaren',
      drivers: ['Lando Norris', 'Oscar Piastri'],
      car: 'MCL38',
      isComplete: true,
      championship: 3,
      points: 520,
      wins: 3,
      podiums: 8,
      rarity: 'rare'
    },
    {
      name: 'Ferrari',
      drivers: ['Charles Leclerc', '???'],
      car: 'SF-24',
      isComplete: false,
      championship: 0,
      points: 0,
      wins: 0,
      podiums: 0,
      rarity: 'epic'
    }
  ];

  const races = [
    { name: 'Bahrain GP', status: 'completed', result: '1st' },
    { name: 'Saudi Arabia GP', status: 'completed', result: '2nd' },
    { name: 'Australia GP', status: 'completed', result: '1st' },
    { name: 'Japan GP', status: 'upcoming', result: null },
    { name: 'China GP', status: 'upcoming', result: null }
  ];

  const currentTeam = teams[activeTeam];

  const simulateRace = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-12 bg-f1-gray/95 backdrop-blur-lg border-b border-f1-gray-light/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-800/50 transition-colors"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <h1 className="text-xl font-bold text-white">Менеджер Команды</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400">
            <Settings size={16} />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Team Selection */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4">Мои команды</h3>
            <div className="space-y-3">
              {teams.map((team, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTeam(index)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    activeTeam === index
                      ? 'bg-f1-red/20 border border-f1-red'
                      : team.isComplete
                      ? 'bg-gray-800/30 hover:bg-gray-800/50'
                      : 'bg-gray-800/10 opacity-50'
                  }`}
                  disabled={!team.isComplete}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        team.rarity === 'legendary' ? 'bg-yellow-400' :
                        team.rarity === 'epic' ? 'bg-purple-400' : 'bg-blue-400'
                      }`}></div>
                      <div>
                        <h4 className={`font-semibold ${team.isComplete ? 'text-white' : 'text-gray-500'}`}>
                          {team.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {team.drivers.join(' • ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {team.isComplete ? (
                        <>
                          {team.championship > 0 && (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Crown size={16} />
                              <span className="text-sm">{team.championship}</span>
                            </div>
                          )}
                          <p className="text-sm text-gray-400">{team.points} очков</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">Неполный состав</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Stats */}
        {currentTeam.isComplete && (
          <Card className="f1-card p-4">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-f1-orange" size={20} />
                <h3 className="text-white font-semibold">{currentTeam.name}</h3>
                {currentTeam.championship > 0 && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Crown size={16} />
                    <span className="text-sm">{currentTeam.championship}x Чемпион</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentTeam.points}</div>
                  <div className="text-sm text-gray-400">Очки</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentTeam.wins}</div>
                  <div className="text-sm text-gray-400">Победы</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentTeam.podiums}</div>
                  <div className="text-sm text-gray-400">Подиумы</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-semibold">Состав:</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-f1-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MV</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{currentTeam.drivers[0]}</p>
                    <p className="text-sm text-gray-400">Основной пилот</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-f1-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SP</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{currentTeam.drivers[1]}</p>
                    <p className="text-sm text-gray-400">Второй пилот</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Race Simulation */}
        {currentTeam.isComplete && (
          <Card className="f1-card p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Симуляция сезона</h3>
                <Button
                  onClick={simulateRace}
                  disabled={isSimulating}
                  className="bg-f1-red hover:bg-f1-red/80"
                >
                  <Play size={16} />
                  {isSimulating ? 'Симуляция...' : 'Следующая гонка'}
                </Button>
              </div>

              {isSimulating && (
                <div className="mb-4 p-4 bg-f1-red/10 rounded-lg border border-f1-red/30">
                  <div className="text-center">
                    <div className="text-white font-semibold mb-2">🏁 Симуляция гонки...</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-f1-red h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-white font-semibold">Календарь гонок:</h4>
                {races.map((race, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    race.status === 'completed' ? 'bg-green-900/20' : 'bg-gray-800/30'
                  }`}>
                    <span className="text-white">{race.name}</span>
                    <div className="flex items-center gap-2">
                      {race.status === 'completed' ? (
                        <span className={`font-semibold ${
                          race.result === '1st' ? 'text-yellow-400' :
                          race.result === '2nd' ? 'text-gray-300' :
                          race.result === '3rd' ? 'text-orange-400' : 'text-gray-400'
                        }`}>
                          {race.result}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Предстоит</span>
                      )}
                      {race.status === 'completed' && (
                        <Trophy size={16} className={
                          race.result === '1st' ? 'text-yellow-400' : 'text-gray-400'
                        } />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rewards */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4">Награды за успехи</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-400" size={20} />
                  <div>
                    <p className="text-white font-semibold">Победа в чемпионате</p>
                    <p className="text-sm text-gray-400">Золотой пак + особая карта</p>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold">+500 💰</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-silver rounded-full"></div>
                  <div>
                    <p className="text-white font-semibold">Подиум в гонке</p>
                    <p className="text-sm text-gray-400">Серебряный пак</p>
                  </div>
                </div>
                <div className="text-gray-300 font-bold">+100 💰</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-600 rounded-full"></div>
                  <div>
                    <p className="text-white font-semibold">Очки в гонке</p>
                    <p className="text-sm text-gray-400">Бронзовый пак</p>
                  </div>
                </div>
                <div className="text-orange-400 font-bold">+50 💰</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamManager;
