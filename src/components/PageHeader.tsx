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
      const systemHeaderHeight = webApp.platform === 'ios' ? 44 : 48;
      const customPadding = 40;
      const totalOffset = systemHeaderHeight + customPadding;
      setHeaderOffset(`${totalOffset}px`);
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50"
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
            className="text-xl font-bold text-white hover:text-white/80 transition-colors"
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
