import { useEffect, useState } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ 
  title, 
  disableGradient = false
}) => {
  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [toolbarHeight, setToolbarHeight] = useState(48); // число, не строка
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      let height = 48;

      if (webApp.platform === 'ios') {
        height = 44;
      }
      if (webApp.safeAreaInsets?.top) {
        height = webApp.safeAreaInsets.top;
      }

      setToolbarHeight(height);
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{ 
          height: toolbarHeight, 
          paddingLeft: '10px', 
          paddingRight: '10px',
          background: disableGradient ? 'transparent' : 'linear-gradient(to bottom, black, transparent)'
        }}
      >
        <h1 
          onClick={() => setIsMenuOpen(true)}
          className="text-xl font-bold text-white cursor-pointer select-none"
          style={{ lineHeight: 1 }}
        >
          {title}
        </h1>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default PageHeader;
