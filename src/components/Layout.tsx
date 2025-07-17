import React from 'react';
import { useBackButton } from '@/hooks/useBackButton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useBackButton();

  // Инициализация Telegram WebApp
  React.useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.enableClosingConfirmation();
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />
    </div>
  );
};

export default Layout;
