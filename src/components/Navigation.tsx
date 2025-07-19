import { Home, Package, ShoppingCart, Gamepad2, ArrowRightLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, exact: true },
    { path: '/collection', icon: Package },
    { path: '/market', icon: ShoppingCart },
    { path: '/trades', icon: ArrowRightLeft },
    { path: '/games', icon: Gamepad2 },
  ];

  const shouldShowTabbar = navItems.some(item => 
    item.exact 
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path)
  );

  if (!shouldShowTabbar) {
    return null;
  }

  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-max mx-auto">
      {/* Градиентная обводка */}
      <div className="p-[1.5px] rounded-full bg-gradient-to-t from-[#3D3D3D] to-black/80">
        {/* Основной фон таббара (черное стекло) */}
        <div className="flex justify-around items-center py-2.5 px-6 bg-black/80 backdrop-blur-sm rounded-full shadow-lg">
          {navItems.map(({ path, icon: Icon, exact }) => {
            const isActive = exact
              ? location.pathname === path
              : location.pathname.startsWith(path);
            
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center p-2.5 mx-0.5"
                style={{ transition: 'none' }}
              >
                {/* Иконки с абсолютной непрозрачностью */}
                <div className={isActive ? "text-white" : "text-[#3D3D3D]"}>
                  <Icon size={22} className="opacity-100" /> 
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
