import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfoButton from './InfoButton';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import { useEffect, useState } from 'react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  infoTitle?: string;
  infoDescription?: string;
}

const PageHeader = ({ 
  title, 
  showBack = false, 
  showSettings = false,
  infoTitle,
  infoDescription
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [headerHeight, setHeaderHeight] = useState('0px');

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      // Получаем высоту системного заголовка Telegram
      const tgHeaderHeight = webApp.platform === 'ios' ? 44 : 48;
      setHeaderHeight(`${tgHeaderHeight}px`);
    }
  }, [isTelegramWebApp, webApp]);

  // В Telegram WebApp скрываем кнопку назад, так как есть системная
  const shouldShowBack = showBack && !isTelegramWebApp;

  return (
    <header 
      className="fixed left-0 w-full z-50"
      style={{ 
        top: headerHeight,
        paddingTop: '16px' // Фиксированный отступ от системных кнопок
      }}
    >
      {/* Градиент сверху (аналогичный Layout) */}
      <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
      
      {/* Контент шапки */}
      <div className="relative flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-3">
          {shouldShowBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {infoTitle && infoDescription && (
            <InfoButton title={infoTitle} description={infoDescription} />
          )}
          {showSettings && (
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
