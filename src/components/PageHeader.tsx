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
  /**
   * Отступ от системных кнопок Telegram в пикселях
   * @default 16 (Telegram) / 60 (браузер)
   */
  topOffset?: number;
  /**
   * Высота самого заголовка в пикселях
   * @default 56
   */
  headerHeight?: number;
}

const PageHeader = ({
  title,
  showBack = false,
  showSettings = false,
  showNotifications = false,
  showProfile = false,
  infoTitle,
  infoDescription,
  disableGradient = false,
  topOffset = 8,
  headerHeight = 36
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { isTelegramWebApp, webApp } = useTelegramWebApp();

  const [offset, setOffset] = useState(isTelegramWebApp ? topOffset + headerHeight : 60);

  useEffect(() => {
    if (!isTelegramWebApp || !webApp) return;

    const updateOffset = () => {
      const safeInset = webApp.safeAreaInset?.top ?? 0;
      setOffset(safeInset + topOffset + headerHeight);
    };

    updateOffset();
    webApp.onEvent('viewportChanged', updateOffset);

    return () => {
      webApp.offEvent('viewportChanged', updateOffset);
    };
  }, [isTelegramWebApp, webApp, topOffset, headerHeight]);

  const shouldShowBack = showBack && !isTelegramWebApp;

  return (
    <>
      {/* Основной заголовок с автоматическим отступом */}
      <header
        className="fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-[420px] bg-black/80 backdrop-blur-sm"
        style={{ 
          top: `${offset}px`,
          height: `${headerHeight}px`
        }}
      >
        {/* Контент заголовка */}
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            {shouldShowBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Назад"
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
            {showNotifications && <NotificationButton />}
            {showProfile && <ProfileButton />}
            {showSettings && <SettingsButton />}
          </div>
        </div>
      </header>

      {/* Отступ для контента */}
      <div style={{ height: `${offset + headerHeight}px` }} />
    </>
  );
};

// Вынесенные компоненты кнопок для чистоты
const NotificationButton = () => (
  <Link
    to="/notifications"
    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
    aria-label="Уведомления"
  >
    <Bell size={20} />
  </Link>
);

const ProfileButton = () => (
  <Link
    to="/profile"
    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
    aria-label="Профиль"
  >
    <User size={20} />
  </Link>
);

const SettingsButton = () => (
  <button 
    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
    aria-label="Настройки"
  >
    <Settings size={20} />
  </button>
);

export default PageHeader;

