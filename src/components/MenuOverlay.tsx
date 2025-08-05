import { useNavigate } from "react-router-dom";

interface MenuOverlayProps {
  topOffset: number;
  selectedPath: string;
  onPathSelect: (path: string) => void;
  isClosing: boolean;
  shouldAnimateOpen: boolean;
}

const MenuOverlay = ({
  topOffset,
  selectedPath,
  onPathSelect,
  isClosing,
  shouldAnimateOpen,
}: MenuOverlayProps) => {
  const navigate = useNavigate();

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

  const currentItem = menuItems.find(item => item.path === selectedPath) || menuItems[0];
  const otherItems = menuItems.filter(item => item.path !== selectedPath);

  const handleNavigation = (path: string) => {
    onPathSelect(path);
    navigate(path);
  };

  return (
    <>
      {/* Background dim with animation only on open or close */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 ${isClosing ? 'animate-fade-out' : shouldAnimateOpen ? 'opacity-0 animate-fade-in' : ''}`}
        style={{ top: topOffset }}
      />

      {/* Menu without animation on container */}
      <div
        className="fixed left-0 right-0 bottom-0 bg-black/95 backdrop-blur-sm z-40"
        style={{ top: topOffset }}
      >
        <MenuContent
          currentItem={currentItem}
          otherItems={otherItems}
          handleNavigation={handleNavigation}
          isClosing={isClosing}
          shouldAnimateOpen={shouldAnimateOpen}
        />
      </div>
    </>
  );
};

export default MenuOverlay;

const MenuContent = ({
  currentItem,
  otherItems,
  handleNavigation,
  isClosing,
  shouldAnimateOpen,
}: {
  currentItem: { label: string },
  otherItems: { path: string, label: string }[],
  handleNavigation: (path: string) => void,
  isClosing: boolean,
  shouldAnimateOpen: boolean
}) => {
  return (
    <nav className="flex flex-col p-4 space-y-3 items-center">
      <span className="text-lg text-white font-bold select-none">
        {currentItem.label}
      </span>

      {otherItems.map((item, index) => (
        <div
          key={item.path}
          className={`w-full text-center ${isClosing ? 'animate-item-disappear' : shouldAnimateOpen ? 'opacity-0 animate-item-appear' : ''}`}
          style={{
            animationDelay: isClosing ? `${index * 0.05}s` : shouldAnimateOpen ? `${index * 0.05}s` : '0s',
            animationFillMode: isClosing || shouldAnimateOpen ? 'forwards' : 'none'
          }}
        >
          <button
            onClick={() => handleNavigation(item.path)}
            className="w-full text-lg text-gray-400 hover:text-white/80 py-1"
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  );
};