import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import MenuOverlay from './MenuOverlay';

const PageHeader = ({ disableGradient = false }) => {
  const location = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldAnimateOpen, setShouldAnimateOpen] = useState(true); // Initial open animation

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
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  useEffect(() => {
    setSelectedPath(location.pathname);
    setShouldAnimateOpen(false); // No animation on section switch
  }, [location.pathname]);

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

  const handleHeaderClick = () => {
    if (isMenuVisible) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuVisible(false);
        setIsClosing(false);
        setShouldAnimateOpen(true); // Enable animation for next open
      }, 300); // Match fadeOut duration
    } else {
      setIsMenuVisible(true);
      setShouldAnimateOpen(true); // Enable opening animation
    }
  };

  return (
    <>
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
            className="text-xl font-bold text-white select-none cursor-pointer"
            onClick={handleHeaderClick}
          >
            {currentItem.label}
          </h1>
        </div>
      </header>

      {isMenuVisible && (
        <MenuOverlay 
          topOffset={headerHeight}
          selectedPath={selectedPath}
          onPathSelect={setSelectedPath}
          isClosing={isClosing}
          shouldAnimateOpen={shouldAnimateOpen}
        />
      )}
    </>
  );
};

export default PageHeader;