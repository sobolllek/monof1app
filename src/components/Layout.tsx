import React from "react";
import { useLocation } from "react-router-dom";
import TelegramNavigationHandler from "./TelegramNavigationHandler";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isCollectionPage = location.pathname.startsWith("/collection/");

  return (
    <div
      className={`relative w-full text-white overflow-x-hidden ${
        isCollectionPage ? "h-screen overflow-hidden bg-black" : "min-h-screen bg-black"
      }`}
    >
      <TelegramNavigationHandler />

      {/* Контент */}
      <div
        className={`${
          isCollectionPage
            ? "w-full h-full" // Полноэкранный без отступов
            : "w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        }`}
      >
        {children}
      </div>

      {/* Нижний градиент — скрыт на страницах коллекции */}
      {!isCollectionPage && (
        <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />
      )}
    </div>
  );
};

export default Layout;
