import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  isTMA: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isTMA }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Обработка кнопки "Назад" для Telegram
  useEffect(() => {
    if (!isTMA) return;
    const tgWebApp = window.Telegram?.WebApp;
    if (!tgWebApp) return;

    // Показываем/скрываем кнопку в зависимости от страницы
    if (isHomePage) {
      tgWebApp.BackButton.hide();
    } else {
      tgWebApp.BackButton.show();
    }

    const handleBack = () => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        tgWebApp.close();
      }
    };

    tgWebApp.BackButton.onClick(handleBack);
    return () => {
      tgWebApp.BackButton.offClick(handleBack);
    };
  }, [isHomePage, isTMA, navigate]);

  // Обработка кнопки "Назад" для веб-версии
  const handleWebBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Кнопка "Назад" для веб-версии (показываем везде кроме главной) */}
      {!isTMA && !isHomePage && (
        <button
          onClick={handleWebBack}
          className="fixed top-4 left-4 z-50 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 border border-gray-700 transition-transform hover:scale-110"
          aria-label="Назад"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Основной контент */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>

      {/* Градиент внизу экрана */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />
    </div>
  );
};

export default Layout;
