import React from "react";
import { useLocation } from "react-router-dom";
import TelegramNavigationHandler from "./TelegramNavigationHandler";
import TelegramTitle from "./TelegramTitle";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isCollectionPage = location.pathname.startsWith("/collection/");
  const isMarketCategoryPage = location.pathname.startsWith("/market/");

  return (
    <div className="flex justify-center bg-black min-h-screen text-white">
      <TelegramNavigationHandler />
      <TelegramTitle />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          minWidth: "420px", // чтобы в Telegram и браузере одинаково
          height: "100%",
        }}
        className={`relative overflow-x-hidden ${
          isCollectionPage
            ? "h-screen overflow-y-auto"
            : "min-h-screen"
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
