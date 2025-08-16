import { ArrowLeft, Settings, Bell, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import InfoButton from './InfoButton';
import useTelegramWebApp from '../hooks/useTelegramWebApp';
import { useEffect, useState } from 'react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  infoTitle?: string;
  infoDescription?: string;
  disableGradient?: boolean;
}

const PageHeader = ({
  title,
  showBack = false,
  showSettings = false,
  showNotifications = false,
  showProfile = false,
  infoTitle,
  infoDescription,
  disableGradient = false
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { isTelegramWebApp, webApp } = useTelegramWebApp();

  // Фиксированный отступ под системные кнопки Telegram
  const [headerOffset, setHeaderOffset] = useState('60px'); // Дефолтное значение для браузера

  useEffect(() => {
    if (!isTelegramWebApp || !webApp) return;

    const updateOffset = () => {
      // Высота системной панели Telegram + наш отступ
      const safeInset = webApp.safeAreaInset?.top ?? 0;
      const telegramHeaderHeight = 56; // Примерная высота системного заголовка Telegram
      setHeaderOffset(`${safeInset + telegramHeaderHeight}px`);
    };

    updateOffset();
    webApp.onEvent('viewportChanged', updateOffset);

    return () => {
      webApp.offEvent('viewportChanged', updateOffset);
    };
  }, [isTelegramWebApp, webApp]);

  const shouldShowBack = showBack && !isTelegramWebApp;

  return (
    <>
      {/* Отступ для системных кнопок Telegram */}
      <div style={{ height: isTelegramWebApp ? headerOffset : '0' }} />
      
      {/* Основной заголовок */}
      <header
        className="fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-[420px] bg-black/80 backdrop-blur-sm"
        style={{
          top: isTelegramWebApp ? headerOffset : '0'
        }}
      >
        {/* Градиент сверху */}
        {!disableGradient && (
          <div
            className="absolute bottom-full left-0 w-full pointer-events-none"
            style={{
              height: headerOffset,
              background: `
                linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 1) 0%,
                  rgba(0, 0, 0, 0.8) 50%,
                  rgba(0, 0, 0, 0) 100%
                )
              `
            }}
          />
        )}

        {/* Содержимое заголовка */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {shouldShowBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            {infoTitle && infoDescription && (
              <InfoButton title={infoTitle} description={infoDescription} />
            )}

            {showNotifications && (
              <Link
                to="/notifications"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell size={20} />
              </Link>
            )}

            {showProfile && (
              <Link
                to="/profile"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <User size={20} />
              </Link>
            )}

            {showSettings && (
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Settings size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Отступ для контента под заголовком */}
      <div style={{ height: '56px' }} />
    </>
  );
};

export default PageHeader;
