// Layout.tsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import TelegramNavigationHandler from "./TelegramNavigationHandler";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isCollectionPage = location.pathname.startsWith("/collection/");
  const isMarketCategoryPage = location.pathname.startsWith("/market/");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    // Telegram добавляет кнопки в `.tg-headered` или `.tg-navbar`
    const observer = new MutationObserver(() => {
      const header = headerRef.current;
      if (!header) return;

      // Проверяем, есть ли системные кнопки
      const backBtn = header.querySelector('[aria-label="Back"], .back-button');
      const menuBtn = header.querySelector('[aria-label="Menu"], .menu-button');

      // Если кнопки есть, вставляем заголовок между ними
      if (backBtn && menuBtn) {
        const title = header.querySelector(".telegram-title");
        if (!title) {
          const titleElement = document.createElement("div");
          titleElement.className = "telegram-title";
          titleElement.textContent = "MONO F1";
          header.insertBefore(titleElement, menuBtn);
        }
      }
    });

    observer.observe(headerRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-center bg-black min-h-screen text-white">
      <TelegramNavigationHandler />

      {/* Telegram сам управляет этим контейнером */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-black h-14 flex items-center px-4"
      >
        {/* Telegram добавит кнопки сюда автоматически */}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          minWidth: "420px",
          height: "100%",
          paddingTop: "56px", // Отступ под заголовок
        }}
        className={`relative overflow-x-hidden ${
          isCollectionPage ? "h-screen overflow-y-auto" : "min-h-screen"
        }`}
      >
        {children}

        {!isCollectionPage && !isMarketCategoryPage && (
          <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />
        )}
      </div>
    </div>
  );
};

export default Layout;
