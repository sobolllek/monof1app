// MenuOverlay.tsx
import { Link } from "react-router-dom";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset: number;
  currentPath: string;
}

const MenuOverlay = ({ isOpen, onClose, topOffset, currentPath }: MenuOverlayProps) => {
  if (!isOpen) return null;

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

  const filteredMenu = menuItems.filter(item => item.path !== currentPath);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 bg-black/95 backdrop-blur-sm overflow-auto"
      style={{ top: topOffset, zIndex: 100 }}
    >
      <nav className="flex flex-col p-4 space-y-3 items-center">
        {filteredMenu.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-white/80 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuOverlay;