import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const tg = window.Telegram?.WebApp;
    if (location.pathname === "/") {
      tg?.close();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-white p-2 rounded hover:bg-gray-700 transition"
      aria-label="Назад"
    >
      ← Назад
    </button>
  );
};

export default BackButton;
