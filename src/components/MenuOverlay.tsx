import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
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

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Меню</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex flex-col p-4 space-y-3">
        {menuItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            onClick={onClose}
            className="text-lg hover:text-white/80 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuOverlay;