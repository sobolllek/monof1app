import { useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

interface TelegramWebAppConfig {
  mainPages: string[];
  enableClosingConfirmation?: boolean;
  autoExpand?: boolean;
}

const defaultConfig: TelegramWebAppConfig = {
  mainPages: ['/', '/collection', '/market', '/trades', '/games'],
  enableClosingConfirmation: false,
  autoExpand: true
};

const useTelegramWebApp = (config: Partial<TelegramWebAppConfig> = {}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  const isMainPage = useMemo(
    () => finalConfig.mainPages.includes(location.pathname),
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

  WebApp.ready();

  WebApp.setHeaderColor('#000000');
  WebApp.setBackgroundColor('#000000');

  if (finalConfig.autoExpand && !WebApp.isExpanded) {
    WebApp.expand();
  }

  if (WebApp.viewportHeight) {
    document.body.style.height = `${WebApp.viewportHeight}px`;
  }

  const handleViewportChange = () => {
    if (WebApp.viewportHeight) {
      document.body.style.height = `${WebApp.viewportHeight}px`;
    }
  };

  WebApp.onEvent('viewportChanged', handleViewportChange);

  if (finalConfig.enableClosingConfirmation) {
    WebApp.enableClosingConfirmation();
  } else {
    WebApp.disableClosingConfirmation();
  }

  return () => {
    WebApp.offEvent('viewportChanged', handleViewportChange);
  };
}, [isTelegramWebApp, finalConfig]);


  // Управление кнопкой "Назад"
  useEffect(() => {
    if (!isTelegramWebApp) return;

    if (isMainPage) {
      WebApp.BackButton.hide();
      console.log('Скрыта кнопка "Назад" для главной страницы:', location.pathname);
    } else {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBackButton);
      console.log('Показана кнопка "Назад" для подстраницы:', location.pathname);
    }

    return () => {
      if (isTelegramWebApp && !isMainPage) {
        WebApp.BackButton.offClick(handleBackButton);
      }
    };
  }, [location.pathname, isMainPage, handleBackButton, isTelegramWebApp]);

  return {
    isTelegramWebApp,
    isMainPage,
    user: isTelegramWebApp ? WebApp.initDataUnsafe.user : undefined,
    platform: isTelegramWebApp ? WebApp.platform : undefined,
    colorScheme: isTelegramWebApp ? WebApp.colorScheme : undefined,
    version: isTelegramWebApp ? WebApp.version : undefined,
    closeTelegramApp,
    expandApp,
    enableClosingConfirmation,
    disableClosingConfirmation,
    webApp: isTelegramWebApp ? WebApp : undefined
  };
};

export default useTelegramWebApp;
