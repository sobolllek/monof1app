
import { Home, Package, ShoppingCart, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home },
    { path: '/collection', icon: Package },
    { path: '/market', icon: ShoppingCart },
    { path: '/games', icon: Gamepad2 },
  ];
  
  if (location.pathname.startsWith('/notifications') || location.pathname.startsWith('/profile')) {
    return null;
  }

  return (
    <>
      {/* Градиент под таббаром */}
      <div className="fixed bottom-0 left-0 right-0 h-24 z-40 
                      bg-gradient-to-t from-black to-transparent 
                      pointer-events-none" />

      {/* Сам таббар */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className="flex justify-around items-center gap-6
                     w-[300px] h-[75px]
                     px-6 py-3 rounded-full
                     bg-[#151515]/90 backdrop-blur-md
                     shadow-[0_4px_30px_rgba(0,0,0,0.5)]
                     border border-[#2A2A2A]/60"
        >
          {navItems.map(({ path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                <Icon size={28} strokeWidth={1.5} />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
