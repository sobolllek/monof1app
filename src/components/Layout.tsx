import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isCollectionPage = location.pathname.startsWith('/collection/');

  return (
    <div 
      className="flex justify-center bg-black min-h-screen text-white"
      style={
        {
          '--tg-bg-color': '#000000',
          '--tg-text-color': '#ffffff',
          '--tg-viewport-height': isCollectionPage ? '100vh' : 'var(--tg-viewport-height)'
        } as React.CSSProperties
      }
    >
      <div
        className={`relative overflow-x-hidden ${
          isCollectionPage ? 'h-screen overflow-y-auto' : 'min-h-screen'
        }`}
        style={
          {
            width: '100%',
            maxWidth: '420px',
            minWidth: '420px',
            height: 'var(--tg-viewport-height)'
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
