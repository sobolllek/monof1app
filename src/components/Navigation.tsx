import { Home, Package, ShoppingCart, Gamepad2, ArrowRightLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type TabbarProps = {
  height?: string;
  width?: string;
  iconSize?: number;
  iconPadding?: string;
  spacing?: string;
};

const Navigation = ({
  height = 'py-3',
  width = 'px-4', 
  iconSize = 26,
  iconPadding = 'p-3',
  spacing = 'mx-1'
}: TabbarProps) => {
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
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-max mx-auto">
      {/* Черное стекло с полным закруглением */}
      <div className={`
        bg-black/80 backdrop-blur-sm border border-gray-700/30
        rounded-full shadow-lg ${height} ${width}
      `}>
        <div className="flex justify-around items-center h-full">
          {navItems.map(({ path, icon: Icon, exact }) => {
            const isActive = exact
              ? location.pathname === path
              : location.pathname.startsWith(path);
            
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center ${iconPadding} ${spacing}`}
              >
                <Icon 
                  size={iconSize} 
                  className={isActive ? 'text-white' : 'text-[#3D3D3D]'} 
                  strokeWidth={isActive ? 2 : 1.5}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
