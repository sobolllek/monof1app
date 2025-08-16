import React from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

const TelegramTitle: React.FC = () => {
  const { isTelegramWebApp } = useTelegramWebApp();

  if (!isTelegramWebApp) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center items-center h-14">
        <h1 className="text-white font-bold text-lg tracking-wider">
          MONO F1
        </h1>
      </div>
    </div>
  );
};

export default TelegramTitle;
