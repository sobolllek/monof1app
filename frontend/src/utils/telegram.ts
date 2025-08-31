declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        initData?: string;
        initDataUnsafe?: any;
        platform?: string;
        colorScheme?: 'light' | 'dark';
      };
    };
  }
}

export const initTelegram = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const getTelegramWebApp = () => {
  return typeof window !== 'undefined' ? window.Telegram?.WebApp : null;
};
