// PageHeader.tsx
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

const PageHeader = ({ disableGradient = false }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Главная" },
    { path: "/collection", label: "Коллекция" },
    { path: "/market", label: "Магазин" },
    { path: "/trades", label: "Обмены" },
    { path: "/auction", label: "Аукцион" },
    { path: "/games", label: "Игры" },
    { path: "/rating", label: "Рейтинг" },
    { path: "/profile", label: "Профиль" }
  ];

  const currentItem = menuItems.find(item => item.path === location.pathname) || menuItems[0];

  const { isTelegramWebApp, webApp } = useTelegramWebApp();
  const [headerHeight, setHeaderHeight] = useState(60);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isTelegramWebApp && webApp) {
      let topInset = 60;
      if (webApp.safeAreaInset?.top) {
        topInset = webApp.safeAreaInset.top;
      } else if (webApp.platform === 'android') {
        topInset = 56;
      }
      setHeaderHeight(topInset);
    }
  }, [isTelegramWebApp, webApp]);

  return (
    <>
      {/* Шапка */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-black"
        style={{ paddingTop: headerHeight }}
      >
        {!disableGradient && (
          <div
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: `-${headerHeight}px`,
              height: `${headerHeight * 2}px`,
              background: `linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))`,
            }}
          />
        )}

        <div className="flex items-center justify-center p-4">
          <h1
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="text-xl font-bold text-white hover:text-white/80 transition-colors cursor-pointer select-none"
          >
            {currentItem.label}
          </h1>
        </div>
      </header>

      {/* Меню поверх контента */}
      {isMenuOpen && (
        <div
          className="fixed left-0 right-0 bg-black/95 backdrop-blur-sm flex flex-col items-center space-y-3 py-4 z-40"
          style={{ top: headerHeight }}
        >
          {menuItems
            .filter(item => item.path !== currentItem.path) // исключаем только текущий
            .map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="text-lg text-gray-400 hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default PageHeader;