import { useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

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

  const tg = useMemo(() => WebApp, []);
  const isTelegramWebApp = useMemo(() => WebApp.isVersionAtLeast('6.0'), []);

  const handleBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const closeTelegramApp = useCallback(() => {
    WebApp.close();
  }, []);

  const expandApp = useCallback(() => {
    WebApp.expand();
  }, []);

  const enableClosingConfirmation = useCallback(() => {
    WebApp.enableClosingConfirmation();
  }, []);

  const disableClosingConfirmation = useCallback(() => {
    WebApp.disableClosingConfirmation();
  }, []);

  // Инициализация Telegram WebApp
  useEffect(() => {
    if (!isTelegramWebApp) {
      console.log('Telegram WebApp не доступен');
      return;
    }

    console.log('Инициализация Telegram WebApp:', {
      version: WebApp.version,
      platform: WebApp.platform,
      colorScheme: WebApp.colorScheme,
      user: WebApp.initDataUnsafe.user
    });

    // Инициализация приложения
    WebApp.ready();

    // Автоматическое расширение если включено
    if (finalConfig.autoExpand && !WebApp.isExpanded) {
      WebApp.expand();
    }

    // Настройка подтверждения закрытия
    if (finalConfig.enableClosingConfirmation) {
      WebApp.enableClosingConfirmation();
    } else {
      WebApp.disableClosingConfirmation();
    }

  }, [isTelegramWebApp, finalConfig]);

  // Управление кнопкой "Назад"
  useEffect(() => {
    if (!isTelegramWebApp) return;

    if (isMainPage) {
      // На главных страницах скрываем кнопку назад
      WebApp.BackButton.hide();
      console.log('Скрыта кнопка "Назад" для главной страницы:', location.pathname);
    } else {
      // На подстраницах показываем кнопку назад
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBackButton);
      console.log('Показана кнопка "Назад" для подстраницы:', location.pathname);
    }

    // Cleanup
    return () => {
      if (isTelegramWebApp && !isMainPage) {
        WebApp.BackButton.offClick(handleBackButton);
      }
    };
  }, [location.pathname, isMainPage, handleBackButton, isTelegramWebApp]);

  return {
    // Статус
    isTelegramWebApp,
    isMainPage,
    
    // Данные пользователя
    user: isTelegramWebApp ? WebApp.initDataUnsafe.user : undefined,
    platform: isTelegramWebApp ? WebApp.platform : undefined,
    colorScheme: isTelegramWebApp ? WebApp.colorScheme : undefined,
    version: isTelegramWebApp ? WebApp.version : undefined,
    
    // Методы управления
    closeTelegramApp,
    expandApp,
    enableClosingConfirmation,
    disableClosingConfirmation,
    
    // Сырой объект WebApp для продвинутого использования
    webApp: isTelegramWebApp ? WebApp : undefined
  };
};

export default useTelegramWebApp;
