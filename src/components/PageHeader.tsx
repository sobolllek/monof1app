import { useEffect, useState } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  disableGradient = false
}) => {
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [toolbarHeight, setToolbarHeight] = useState(48);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      let height = 48;

      if (webApp.safeAreaInsets && webApp.safeAreaInsets.top > 0) {
        height = webApp.safeAreaInsets.top;
      } else if (webApp.platform === 'ios') {
        height = 44;
      }

      // Ограничиваем максимальную высоту, чтобы не было слишком высоко
      if (height > 60) height = 60;

      setToolbarHeight(height);
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{ 
          height: toolbarHeight,
          backgroundColor: disableGradient ? 'transparent' : 'rgba(0,0,0,0.9)',
          paddingLeft: '10px', 
          paddingRight: '10px',
        }}
      >
        <h1 
          onClick={() => setIsMenuOpen(true)}
          className="text-xl font-bold text-white cursor-pointer select-none"
          style={{ lineHeight: 1 }}
        >
          {title || 'Заголовок'}
        </h1>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default PageHeader;
