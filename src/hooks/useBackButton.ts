import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NO_BACK_PATHS = ['/', '/collection', '/market', '/trades', '/games'];

export function useBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTgWebApp = window.Telegram?.WebApp;

  useEffect(() => {
    if (!isTgWebApp) return;

    const shouldHideBackButton = NO_BACK_PATHS.includes(location.pathname);

    if (shouldHideBackButton) {
      window.Telegram.WebApp.BackButton.hide();
    } else {
      window.Telegram.WebApp.BackButton.show();
      const handler = () => {
        console.log('Navigating back from:', location.pathname);
        navigate(-1);
      };
      window.Telegram.WebApp.BackButton.onClick(handler);

      return () => {
        window.Telegram.WebApp.BackButton.offClick(handler);
      };
    }
  }, [location, navigate, isTgWebApp]);
}
