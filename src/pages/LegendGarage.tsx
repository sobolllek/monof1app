
import { useState } from 'react';
import { ArrowLeft, RotateCw, Lightbulb, Play, Eye, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const LegendGarage = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(0);
  const [lightingMode, setLightingMode] = useState('studio');
  const [isAnimating, setIsAnimating] = useState(false);

  const cars = [
    {
      name: 'Red Bull RB20 Chrome',
      team: 'Red Bull Racing',
      isUnlocked: true,
      isSpecial: true,
      image: '/image/cards/cars/png/rb20-1.png',
      description: 'Особая хромированная ливрея за сбор полного состава Red Bull'
    },
    {
      name: 'Ferrari SF-24',
      team: 'Ferrari',
      isUnlocked: true,
      isSpecial: false,
      image: '/image/cards/cars/png/sf24-1.png',
      description: 'Классический болид Ferrari'
    },
    {
      name: 'Mercedes W15 Silver',
      team: 'Mercedes',
      isUnlocked: false,
      isSpecial: true,
      image: '/image/cards/cars/png/w15-1.png',
      description: 'Серебряная ливрея - требует полный состав Mercedes'
    },
    {
      name: 'McLaren MCL38',
      team: 'McLaren',
      isUnlocked: true,
      isSpecial: false,
      image: '/image/cards/cars/png/mcl38-1.png',
      description: 'Папайя-болид McLaren'
    }
  ];

  const lightingModes = [
    { id: 'studio', name: 'Студия', icon: '💡' },
    { id: 'track', name: 'Трасса', icon: '🏁' },
    { id: 'sunset', name: 'Закат', icon: '🌅' },
    { id: 'neon', name: 'Неон', icon: '🌃' }
  ];

  const currentCar = cars[selectedCar];

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
          <h1 className="text-xl font-bold text-white">Гараж Легенд</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400"
          >
            <Eye size={16} />
            Публичный
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6 ">
        {/* 3D Viewer */}
        <Card className="f1-card p-6">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4">
              {currentCar.isUnlocked ? (
                <>
                  <img 
                    src={currentCar.image} 
                    alt={currentCar.name}
                    className={`w-full h-full object-contain transition-transform duration-1000 ${
                      isAnimating ? 'animate-pulse scale-105' : ''
                    }`}
                  />
                  {currentCar.isSpecial && (
                    <div className="absolute top-4 right-4 bg-f1-red/90 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ✨ ОСОБАЯ
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Lock size={48} className="mx-auto mb-4" />
                    <p className="text-lg font-semibold">Заблокировано</p>
                    <p className="text-sm">Соберите полный состав команды</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
                disabled={!currentCar.isUnlocked}
                className="text-white hover:bg-f1-gray-light/50"
              >
                <RotateCw size={16} />
                Вращать
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
                disabled={!currentCar.isUnlocked}
                className="text-white hover:bg-f1-gray-light/50"
              >
                <Play size={16} />
                Анимация
              </Button>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{currentCar.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{currentCar.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Lighting Controls */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-f1-orange" size={20} />
              <h3 className="text-white font-semibold">Освещение</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {lightingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setLightingMode(mode.id)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    lightingMode === mode.id
                      ? 'bg-f1-red text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800/70'
                  }`}
                >
                  <div className="text-xl mb-1">{mode.icon}</div>
                  <div className="text-xs">{mode.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Car Selection */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4">Коллекция машин</h3>
            <div className="grid grid-cols-2 gap-3">
              {cars.map((car, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCar(index)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedCar === index
                      ? 'bg-f1-red/20 border border-f1-red'
                      : 'bg-gray-800/30 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      {car.isUnlocked ? (
                        <img src={car.image} alt={car.name} className="w-full h-full object-contain" />
                      ) : (
                        <Lock size={20} className="text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${car.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {car.name}
                      </p>
                      <p className="text-xs text-gray-400">{car.team}</p>
                      {car.isSpecial && car.isUnlocked && (
                        <div className="text-xs text-f1-orange">✨ Особая ливрея</div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="f1-card p-4">
          <CardContent className="p-0">
            <h3 className="text-white font-semibold mb-4">Прогресс коллекции</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Red Bull Racing</span>
                <span className="text-green-400">✓ Полный сет</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ferrari</span>
                <span className="text-yellow-400">1/2 пилота</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Mercedes</span>
                <span className="text-red-400">0/2 пилота</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">McLaren</span>
                <span className="text-green-400">✓ Полный сет</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegendGarage;
