import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTelegramBack() {
  const navigate = useNavigate();

  // Обработка нажатия кнопки
  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const tg = window.Telegram.WebApp;
    const handleBack = () => {
      if (window.history.length > 1) {
        navigate(-1); // Назад
      } else {
        tg.close(); // Закрыть Mini App
      }
    };

    tg.BackButton.onClick(handleBack);
    return () => tg.BackButton.offClick(handleBack);
  }, [navigate]);

  // Показать/скрыть кнопку
  useEffect(() => {
    if (!window.Telegram?.WebApp) return;
    const tg = window.Telegram.WebApp;
    tg.BackButton[window.history.length > 1 ? 'show' : 'hide']();
  }, [navigate]);
}
