import { ArrowLeft, Settings, Bell, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import InfoButton from './InfoButton';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import { useEffect, useState } from 'react';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  showBack = false, 
  showSettings = false,
  showNotifications = false,
  showProfile = false,
  infoTitle,
  infoDescription,
  disableGradient = false
}) => {
  const navigate = useNavigate();
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [headerOffset, setHeaderOffset] = useState('0px');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      <header 
        className="fixed left-0 w-full z-50"
        style={{ top: headerOffset }}
      >
        {!disableGradient && (
          <div 
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: `calc(-1 * ${headerOffset})`,
              height: `calc(${headerOffset} * 2)`,
              background: `linear-gradient(
                to bottom,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 0) 100%
              )`,
            }}
          />
        )}

        <div className="relative flex items-center px-4 py-3">
          {/* Левая часть */}
          <div className="flex items-center gap-3 z-10">
            {shouldShowBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
          </div>

          {/* Заголовок как кнопка меню по центру */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-xl font-bold hover:text-white/80 transition-colors"
            >
              {title}
            </button>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-2 ml-auto z-10">
            {infoTitle && infoDescription && (
              <InfoButton title={infoTitle} description={infoDescription} />
            )}
            {showNotifications && (
              <Link to="/notifications" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell size={20} />
              </Link>
            )}
            {showProfile && (
              <Link to="/profile" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
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

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default PageHeader;