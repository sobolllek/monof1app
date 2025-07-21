import { ArrowLeft, Settings, Bell, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import InfoButton from './InfoButton';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import { useEffect, useState } from 'react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  infoTitle?: string;
  infoDescription?: string;
  disableGradient?: boolean; // Новый пропс для отключения градиента
}

const PageHeader = ({ 
  title, 
  showBack = false, 
  showSettings = false,
  showNotifications = false,
  showProfile = false,
  infoTitle,
  infoDescription,
  disableGradient = false // По умолчанию градиент включен
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [headerOffset, setHeaderOffset] = useState('0px');

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      const systemHeaderHeight = webApp.platform === 'ios' ? 44 : 48;
      const customPadding = 40;
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
      {/* Плавная подложка с градиентом (только если не отключена) */}
      {!disableGradient && (
        <div 
          className="absolute left-0 w-full pointer-events-none"
          style={{
            top: `calc(-1 * ${headerOffset})`,
            height: `calc(${headerOffset} * 2)`,
            background: `
              linear-gradient(
                to bottom,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 0.98) 15%,
                rgba(0, 0, 0, 0.95) 30%,
                rgba(0, 0, 0, 0.9) 45%,
                rgba(0, 0, 0, 0.8) 60%,
                rgba(0, 0, 0, 0.6) 75%,
                rgba(0, 0, 0, 0.4) 85%,
                rgba(0, 0, 0, 0.2) 92%,
                rgba(0, 0, 0, 0.1) 96%,
                rgba(0, 0, 0, 0) 100%
              )
            `,
          }}
        />
      )}
      
      {/* Основной контент заголовка */}
      <div className="relative flex items-center justify-between px-4 py-3">
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
          
          {showNotifications && (
            <Link 
              to="/notifications" 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Bell size={20} />
            </Link>
          )}
          
          {showProfile && (
            <Link 
              to="/profile" 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <User size={20} />
            </Link>
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
