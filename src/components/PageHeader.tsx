import { useEffect, useState } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  disableGradient = false
}) => {
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [toolbarHeight, setToolbarHeight] = useState('48px'); // дефолт высоты тулбара
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      let height = 48; // Android дефолт

      if (webApp.platform === 'ios') {
        height = 44;
      }
      // Если safeAreaInsets доступен, берём его высоту тулбара
      if (webApp.safeAreaInsets && webApp.safeAreaInsets.top) {
        height = webApp.safeAreaInsets.top;
      }
      setToolbarHeight(`${height}px`);
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{ height: toolbarHeight }}
      >
        {!disableGradient && (
          <div 
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: 0,
              height: toolbarHeight,
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
