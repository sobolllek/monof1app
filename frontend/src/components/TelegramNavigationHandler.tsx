import useTelegramWebApp from '../hooks/useTelegramWebApp';

const TelegramNavigationHandler = () => {
  // Хук автоматически управляет навигацией
  useTelegramWebApp();
  
  return null;
};

export default TelegramNavigationHandler;