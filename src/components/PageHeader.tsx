import { useEffect, useState } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  disableGradient = false
}) => {
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [headerOffset, setHeaderOffset] = useState('0px');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      let offset = 0;

      // Берём safeAreaInsets.top или дефолты платформ
      if (webApp.safeAreaInsets?.top) {
        offset = webApp.safeAreaInsets.top;
      } else {
        offset = webApp.platform === 'ios' ? 44 : 48;
      }

      // Делаем поправку, чтобы текст выглядел по центру
      setHeaderOffset(`${offset - 4}px`);
    } else {
      setHeaderOffset('48px'); // fallback
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{ paddingTop: headerOffset }}
      >
        {!disableGradient && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 0) 100%
              )`,
            }}
          />
        )}

        <h1 
          onClick={() => setIsMenuOpen(true)}
          className="text-xl font-bold text-white hover:text-white/80 transition-colors cursor-pointer relative z-10"
        >
          {title}
        </h1>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default PageHeader;
