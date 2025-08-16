import { useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

interface TelegramWebAppConfig {
  mainPages: string[];
  enableClosingConfirmation?: boolean;
  autoExpand?: boolean;
}

interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
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
    () => finalConfig.mainPages.some(path => location.pathname.startsWith(path)),
    [location.pathname, finalConfig.mainPages]
  );

  const isTelegramWebApp = useMemo(() => Boolean(WebApp.platform), []);
  const webApp = useMemo(() => isTelegramWebApp ? WebApp : null, [isTelegramWebApp]);

  const handleBackButton = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (!isTelegramWebApp) return;

    WebApp.ready();
    
    if (finalConfig.autoExpand && !WebApp.isExpanded) {
      WebApp.expand();
    }

    return () => {
      WebApp.disableClosingConfirmation();
    };
  }, [isTelegramWebApp, finalConfig.autoExpand]);

  useEffect(() => {
    if (!isTelegramWebApp) return;

    if (isMainPage) {
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBackButton);
    }

    return () => {
      WebApp.BackButton.offClick(handleBackButton);
      WebApp.BackButton.hide();
    };
  }, [location.pathname, isMainPage, handleBackButton, isTelegramWebApp]);

  return {
    isTelegramWebApp,
    isMainPage,
    webApp, // Теперь возвращаем webApp
    themeParams: isTelegramWebApp ? WebApp.themeParams : undefined,
    expand: () => WebApp.expand(),
    close: () => WebApp.close()
  };
};

export default useTelegramWebApp;
