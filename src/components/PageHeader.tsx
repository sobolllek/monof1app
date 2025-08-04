import { useEffect, useState } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  disableGradient = false
}) => {
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [headerOffset, setHeaderOffset] = useState('3.75rem'); // дефолт
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      // Подбираем высоту отступа в зависимости от платформы
      const iosOffset = '3.75rem';     // примерно 60px
      const androidOffset = '3.5rem';  // примерно 56px
      const defaultOffset = '3.75rem'; // fallback
      
      if (webApp.platform === 'ios') {
        setHeaderOffset(iosOffset);
      } else if (webApp.platform === 'android') {
        setHeaderOffset(androidOffset);
      } else {
        setHeaderOffset(defaultOffset);
      }
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent"
        style={{ paddingTop: headerOffset }}
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

        <div className="flex items-center justify-center p-4">
          <h1 
            onClick={() => setIsMenuOpen(true)}
            className="text-xl font-bold text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            {title}
          </h1>
        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default PageHeader;
