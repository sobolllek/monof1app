import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TABBAR_ROUTES = ['/', '/collection', '/market', '/trades', '/games'];

export function useBackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isTabbarRoot = TABBAR_ROUTES.includes(location.pathname);

    if (!isTabbarRoot) {
      window.Telegram?.WebApp?.BackButton.show();
    } else {
      window.Telegram?.WebApp?.BackButton.hide();
    }

    const handler = () => navigate(-1);
    window.Telegram?.WebApp?.BackButton.onClick(handler);

    return () => {
      window.Telegram?.WebApp?.BackButton.offClick(handler);
    };
  }, [location, navigate]);
}
