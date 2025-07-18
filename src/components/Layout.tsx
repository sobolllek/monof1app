import React from "react";
import TelegramNavigationHandler from "./TelegramNavigationHandler";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
      <TelegramNavigationHandler />
      {/* Контент */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>

      {/* Фиксированный градиент поверх, снизу */}
      <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />
    </div>
  );
};

export default Layout;