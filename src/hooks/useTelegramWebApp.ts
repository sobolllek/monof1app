import { useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

type TelegramColor = 'bg_color' | 'secondary_bg_color' | `#${string}`;

interface TelegramWebAppConfig {
  mainPages: string[];
  enableClosingConfirmation?: boolean;
  autoExpand?: boolean;
  headerColor?: TelegramColor;
  backgroundColor?: TelegramColor;
  textColor?: string;
}

const defaultConfig: TelegramWebAppConfig = {
  mainPages: ['/', '/collection', '/market', '/trades', '/games'],
  enableClosingConfirmation: false,
  autoExpand: true,
  headerColor: '#000000', // Чёрная шапка
  backgroundColor: '#000000', // Чёрный фон
  textColor: '#ffffff' // Белый текст
};

const useTelegramWebApp = (config: Partial<TelegramWebAppConfig> = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const finalConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  // Валидация цветов Telegram
  const validateColor = (color: string): TelegramColor => {
    if (color === 'bg_color' || color === 'secondary_bg_color') return color;
    return /^#[0-9A-Fa-f]{6}$/.test(color) ? color as `#${string}` : '#000000';
  };

  const safeHeaderColor = validateColor(finalConfig.headerColor || '#000000');
  const safeBackgroundColor = validateColor(finalConfig.backgroundColor || '#000000');

  const isMainPage = useMemo(
    () => finalConfig.mainPages.some(path => location.pathname.startsWith(path)),
    [location.pathname, finalConfig.mainPages]
  );

  const isTelegramWebApp = useMemo(() => Boolean(WebApp.platform), []);

  // Инициализация WebApp
  useEffect(() => {
    if (!isTelegramWebApp) return;

    WebApp.ready();
    WebApp.setHeaderColor(safeHeaderColor);
    WebApp.setBackgroundColor(safeBackgroundColor);

    if (finalConfig.autoExpand && !WebApp.isExpanded) {
      WebApp.expand();
    }

    // Применяем глобальные стили
    document.documentElement.style.setProperty('--tg-bg-color', safeBackgroundColor);
    document.documentElement.style.setProperty('--tg-text-color', finalConfig.textColor || '#ffffff');

    return () => {
      WebApp.disableClosingConfirmation();
    };
  }, [isTelegramWebApp, safeHeaderColor, safeBackgroundColor, finalConfig]);

  // Управление кнопкой "Назад"
  const handleBackButton = useCallback(() => navigate(-1), [navigate]);
  
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
    themeParams: isTelegramWebApp ? WebApp.themeParams : undefined,
    expand: () => WebApp.expand(),
    close: () => WebApp.close()
  };
};

export default useTelegramWebApp;
