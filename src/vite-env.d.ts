/// <reference types="vite/client" />

interface Window {
    Telegram: {
      WebApp: {
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        close: () => void;
        expand: () => void;
      };
    };
    mockBackButton: (() => void) | null;
  }
