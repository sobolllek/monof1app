import { ReactNode } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

interface TelegramWebAppProviderProps {
  children: ReactNode;
}

const TelegramWebAppProvider = ({ children }: TelegramWebAppProviderProps) => {
  // Инициализируем Telegram Web App хук на верхнем уровне
  const _telegramWebApp = useTelegramWebApp();
  
  return <>{children}</>;
};

export default TelegramWebAppProvider;