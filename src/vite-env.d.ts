/// <reference types="vite/client" />

interface TelegramWebApp {
    ready(): void;
    expand(): void;
    close(): void;
    setHeaderColor(color: string): void;
    setBackgroundColor(color: string): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
    BackButton: {
      show(): void;
      hide(): void;
      onClick(callback: () => void): void;
    };
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  
