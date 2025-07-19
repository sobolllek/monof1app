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
  const [headerOffset, setHeaderOffset] = useState('0px');

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      const systemHeaderHeight = webApp.platform === 'ios' ? 44 : 48;
      const customPadding = 36;
      const totalOffset = systemHeaderHeight + customPadding;
      setHeaderOffset(`${totalOffset}px`);
    }
  }, [isTelegramWebApp, webApp]);

  const shouldShowBack = showBack && !isTelegramWebApp;

  return (
    <header 
      className="fixed left-0 w-full z-50"
      style={{ 
        top: headerOffset,
      }}
    >
      {/* Чёрная подложка под системными кнопками */}
      <div 
        className="absolute left-0 w-full bg-black"
        style={{
          top: `calc(-1 * ${headerOffset})`,
          height: headerOffset,
        }}
      />
      
      {/* Градиентный переход (опционально) */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none -z-10" />
      
      {/* Контент заголовка */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-black">
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
