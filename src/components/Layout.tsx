import React from 'react';
import { useLocation } from 'react-router-dom';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isTelegramWebApp } = useTelegramWebApp();
  const isCollectionPage = location.pathname.startsWith('/collection/');
  const isMarketCategoryPage = location.pathname.startsWith('/market/');

  // Рассчитываем отступы в зависимости от платформы
  const layoutStyles = {
    '--tg-bg-color': '#000000',
    '--tg-text-color': '#ffffff',
    '--tg-viewport-height': isTelegramWebApp 
      ? 'var(--tg-viewport-stable-height, 100vh)' 
      : '100vh',
    '--tg-safe-area-top': isTelegramWebApp
      ? 'env(safe-area-inset-top, 0px)'
      : '0px'
  } as React.CSSProperties;

  return (
    <div 
      className="flex justify-center bg-black min-h-screen text-white"
      style={layoutStyles}
    >
      <div
        className={`relative overflow-x-hidden ${
          isCollectionPage ? 'h-screen overflow-y-auto' : 'min-h-screen'
        }`}
        style={{
          width: '100%',
          maxWidth: '420px',
          minWidth: '420px',
          height: 'var(--tg-viewport-height)',
          paddingTop: 'var(--tg-safe-area-top)'
        }}
      >
        {children}

        {/* Градиент внизу страницы (кроме специальных страниц) */}
        {!isCollectionPage && !isMarketCategoryPage && (
          <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />
        )}
      </div>
    </div>
  );
};

export default Layout;
