
import { Home, Package, ShoppingCart, Gamepad2, ArrowRightLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Главное' },
    { path: '/collection', icon: Package, label: 'Коллекция' },
    { path: '/market', icon: ShoppingCart, label: 'Маркет' },
    { path: '/trades', icon: ArrowRightLeft, label: 'Обмены' },
    { path: '/games', icon: Gamepad2, label: 'Игры' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around items-center py-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-f1-red bg-f1-red/10' 
                  : 'text-gray-400 hover:text-white hover:bg-f1-gray-light/50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
