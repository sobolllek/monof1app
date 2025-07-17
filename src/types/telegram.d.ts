export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (cb: () => void) => void;
          offClick: (cb: () => void) => void;
          isVisible: boolean;
        };
        MainButton: {
          show: () => void;
          hide: () => void;
          setParams: (params: { 
            is_visible?: boolean; 
            text?: string 
          }) => void;
        };
        expand: () => void;
        enableClosingConfirmation: () => void;
        platform: string;
      };
    };
  }
}
