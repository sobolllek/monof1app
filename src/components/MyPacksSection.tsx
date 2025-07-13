
import { useState, useEffect } from 'react';
import { Package, Gift, ChevronRight } from 'lucide-react';
import PackOpeningAnimation from './PackOpeningAnimation';

const MyPacksSection = () => {
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [selectedPack, setSelectedPack] = useState('');
  const [showPacksList, setShowPacksList] = useState(false);
  const [myPacks, setMyPacks] = useState<any[]>([]);

  useEffect(() => {
    // Загружаем паки из localStorage
    const loadPacks = () => {
      const saved = localStorage.getItem('myPacks');
      if (saved) {
        setMyPacks(JSON.parse(saved));
      }
    };

    loadPacks();
    
    // Обновляем каждые 5 секунд для синхронизации с ежедневными паками
    const interval = setInterval(loadPacks, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalPacks = myPacks.reduce((sum, pack) => sum + pack.count, 0);

  const getPackGradient = (category: string) => {
    switch (category) {
      case 'epic': return 'from-purple-400/20 to-pink-500/20 border-purple-400/30';
      case 'rare': return 'from-blue-400/20 to-cyan-500/20 border-blue-400/30';
      default: return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
    }
  };

  const handleOpenPack = (pack: any) => {
    if (pack.count > 0) {
      setSelectedPack(pack.name);
      setShowPackOpening(true);
    }
  };

  const handlePackOpened = (cards: any[]) => {
    console.log('Получены карты:', cards);
    
    // Уменьшаем количество паков
    const updatedPacks = myPacks.map(pack => 
      pack.name === selectedPack 
        ? { ...pack, count: pack.count - 1 }
        : pack
    ).filter(pack => pack.count > 0);
    
    setMyPacks(updatedPacks);
    localStorage.setItem('myPacks', JSON.stringify(updatedPacks));
  };

  if (totalPacks === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Мои паки</h3>
        <div className="f1-card p-6 text-center">
          <Gift className="text-gray-400 mx-auto mb-4" size={48} />
          <h4 className="text-white font-semibold mb-2">Нет накопленных паков</h4>
          <p className="text-gray-400 text-sm">Получите ежедневные паки или купите их в магазине</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Мои паки</h3>
        <div className="text-white font-semibold">{totalPacks}</div>
      </div>
      
      {!showPacksList ? (
        <button 
          onClick={() => setShowPacksList(true)}
          className="w-full f1-card p-4 flex items-center justify-between hover:bg-f1-gray-light/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 bg-f1-gray-light rounded-lg flex items-center justify-center text-2xl">
              📦
            </div>
            
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-white">Открыть паки</h4>
              <p className="text-gray-300 text-sm">У вас {totalPacks} пак(ов)</p>
            </div>
          </div>
          
          <ChevronRight className="text-white" size={20} />
        </button>
      ) : (
        <div className="space-y-3">
          <button 
            onClick={() => setShowPacksList(false)}
            className="text-f1-orange text-sm hover:underline"
          >
            ← Назад
          </button>
          
          {myPacks.filter(pack => pack.count > 0).map((pack, index) => (
            <div key={index} className={`f1-card p-4 bg-gradient-to-r ${getPackGradient(pack.category)} border-2`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-f1-gray-light rounded-lg flex items-center justify-center text-2xl">
                  {pack.emoji}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{pack.name}</h4>
                  <p className="text-gray-300 text-sm">Количество: {pack.count}</p>
                </div>
                
                <div className="text-right">
                  <Package className="text-f1-orange mb-2" size={20} />
                </div>
              </div>
              
              <button 
                onClick={() => handleOpenPack(pack)}
                className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Открыть пак
              </button>
            </div>
          ))}
        </div>
      )}

      <PackOpeningAnimation
        isOpen={showPackOpening}
        onClose={() => setShowPackOpening(false)}
        packType={selectedPack}
        onPackOpened={handlePackOpened}
      />
    </div>
  );
};

export default MyPacksSection;
