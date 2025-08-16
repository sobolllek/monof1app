import { ReactNode } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

interface TelegramWebAppProviderProps {
  children?: ReactNode;
}

const TelegramWebAppProvider = ({ children }: TelegramWebAppProviderProps) => {
  useTelegramWebApp();
  return <>{children}</>;
};

export default TelegramWebAppProvider;
