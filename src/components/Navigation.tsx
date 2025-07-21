import { Home, Package, ShoppingCart, Gamepad2, ArrowRightLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type TabbarProps = {
  height?: string;
  width?: string; 
  iconSize?: number;
  iconPadding?: string;
  spacing?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'none' | number;
};

const Navigation = ({
  height = 'py-3',
  width = 'px-4',
  iconSize = 28,
  iconPadding = 'p-3',
  spacing = 'mx-1',
  blurIntensity = 'sm'
}: TabbarProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, exact: true },
    { path: '/collection', icon: Package, exact: true },
    { path: '/market', icon: ShoppingCart, exact: true },
    { path: '/trades', icon: ArrowRightLeft, exact: true },
    { path: '/games', icon: Gamepad2, exact: true },
  ];

  const shouldShowTabbar = navItems.some(item => 
    item.exact 
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path)
  );

  if (!shouldShowTabbar) {
    return null;
  }

  const getBlurClass = () => {
    if (blurIntensity === 'none') return '';
    if (typeof blurIntensity === 'number') {
      return `backdrop-blur-[${blurIntensity}px]`;
    }
    return {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg'
    }[blurIntensity];
  };

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-max mx-auto">
      <div className="relative" style={{ width: '353px', height: '82px' }}>
        {/* Основной контейнер с эффектом стекла (но теперь чёрный) */}
        <div className={`
          absolute inset-0
          ${getBlurClass()}
          bg-black/20           
          border border-black/10
          rounded-[41px]
          overflow-hidden
          ${height} ${width}
        `}>
          {/* Эффект преломления по краям (тёмные градиенты вместо светлых) */}
          <div className="absolute inset-0 border-x border-black/20 pointer-events-none">
            {/* Левый край (тёмный градиент) */}
            <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-black/50 to-transparent opacity-30" />
            {/* Правый край (тёмный градиент) */}
            <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-black/50 to-transparent opacity-30" />
            {/* Верхний блик (слабый, тёмный) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-2 bg-black/10 blur-[6px] rounded-full" />
          </div>

          {/* Иконки (белые, без изменений) */}
          <div className="flex justify-around items-center h-full relative z-10">
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
      </div>
    </nav>
  );
};

export default Navigation;
