import { useEffect, useState } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  disableGradient = false
}) => {
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [paddingTop, setPaddingTop] = useState('3.75rem'); // fallback
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      let topInset = 60; // дефолт (примерно iOS)
      
      if (webApp.safeAreaInset && webApp.safeAreaInset.top) {
        topInset = webApp.safeAreaInset.top; // точное значение от Telegram
      } else if (webApp.platform === 'android') {
        topInset = 56;
      }
      
      // Переводим в px
      setPaddingTop(`${topInset}px`);
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ paddingTop }}
      >
        {!disableGradient && (
          <div 
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: `calc(-1 * ${paddingTop})`,
              height: `calc(${paddingTop} * 2)`,
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
