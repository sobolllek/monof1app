import { useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Расширенные типы для Telegram Web Apps API
interface TelegramWebAppButton {
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
  isVisible: boolean;
}

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramWebAppUser;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  BackButton: TelegramWebAppButton;
  MainButton: TelegramWebAppButton;
  isClosingConfirmationEnabled: boolean;
  ready: () => void;
  close: () => void;
  expand: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  onEvent: (eventType: string, eventHandler: () => void) => void;
  offEvent: (eventType: string, eventHandler: () => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebAppConfig {
  mainPages: string[];
  enableClosingConfirmation?: boolean;
  autoExpand?: boolean;
}

const defaultConfig: TelegramWebAppConfig = {
  mainPages: [
    '/',
    '/collection', 
    '/market',
    '/trades',
    '/games'
  ],
  enableClosingConfirmation: false,
  autoExpand: true
};

const useTelegramWebApp = (config: Partial<TelegramWebAppConfig> = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  
  const isMainPage = useMemo(() => 
    finalConfig.mainPages.includes(location.pathname), 
    [location.pathname, finalConfig.mainPages]
  );

  const tg = useMemo(() => window.Telegram?.WebApp, []);
  const isTelegramWebApp = useMemo(() => !!tg, [tg]);

  const handleBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const closeTelegramApp = useCallback(() => {
    if (tg) {
      tg.close();
    }
  }, [tg]);

  const expandApp = useCallback(() => {
    if (tg) {
      tg.expand();
    }
  }, [tg]);

  const enableClosingConfirmation = useCallback(() => {
    if (tg) {
      tg.enableClosingConfirmation();
    }
  }, [tg]);

  const disableClosingConfirmation = useCallback(() => {
    if (tg) {
      tg.disableClosingConfirmation();
    }
  }, [tg]);

  // Инициализация Telegram WebApp
  useEffect(() => {
    if (!tg) {
      console.log('Telegram WebApp не доступен');
      return;
    }

    console.log('Инициализация Telegram WebApp:', {
      version: tg.version,
      platform: tg.platform,
      colorScheme: tg.colorScheme,
      user: tg.initDataUnsafe.user
    });

    // Инициализация приложения
    tg.ready();

    // Автоматическое расширение если включено
    if (finalConfig.autoExpand && !tg.isExpanded) {
      tg.expand();
    }

    // Настройка подтверждения закрытия
    if (finalConfig.enableClosingConfirmation) {
      tg.enableClosingConfirmation();
    } else {
      tg.disableClosingConfirmation();
    }

  }, [tg, finalConfig]);

  // Управление кнопкой "Назад"
  useEffect(() => {
    if (!tg) return;

    if (isMainPage) {
      // На главных страницах скрываем кнопку назад
      tg.BackButton.hide();
      console.log('Скрыта кнопка "Назад" для главной страницы:', location.pathname);
    } else {
      // На подстраницах показываем кнопку назад
      tg.BackButton.show();
      tg.BackButton.onClick(handleBackButton);
      console.log('Показана кнопка "Назад" для подстраницы:', location.pathname);
    }

    // Cleanup
    return () => {
      if (tg && !isMainPage) {
        tg.BackButton.offClick(handleBackButton);
      }
    };
  }, [location.pathname, isMainPage, handleBackButton, tg]);

  return {
    // Статус
    isTelegramWebApp,
    isMainPage,
    
    // Данные пользователя
    user: tg?.initDataUnsafe.user,
    platform: tg?.platform,
    colorScheme: tg?.colorScheme,
    version: tg?.version,
    
    // Методы управления
    closeTelegramApp,
    expandApp,
    enableClosingConfirmation,
    disableClosingConfirmation,
    
    // Сырой объект WebApp для продвинутого использования
    webApp: tg
  };
};

export default useTelegramWebApp;