
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import NotificationCard from '../components/NotificationCard';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications] = useState([
    {
      title: "Пак доступен!",
      description: "Можно открыть 12-ти часовой пак",
      time: "09:41",
      type: "pack" as const,
      date: "Сегодня"
    },
    {
      title: "Получено достижение!",
      description: "Какое-то достижение",
      time: "09:41",
      type: "achievement" as const,
      date: "Сегодня"
    },
    {
      title: "Рулетка!",
      description: "Пришло время испытать удачу на колесе фортуны!",
      time: "09:41",
      type: "roulette" as const,
      date: "Сегодня"
    },
    {
      title: "Обновление!",
      description: "Бот был обновлен! Информация об обновлениях уже на канале!",
      time: "09:41",
      type: "update" as const,
      date: "Сегодня"
    },
    {
      title: "Пак доступен!",
      description: "Можно открыть 12-ти часовой пак",
      time: "09:41",
      type: "pack" as const,
      date: "15 Мая"
    },
    {
      title: "Получено достижение!",
      description: "Какое-то достижение",
      time: "09:41",
      type: "achievement" as const,
      date: "15 Мая"
    },
  ]);

  const hasNotifications = notifications.length > 0;

  return (
    <div className="min-h-screen bg-f1-gradient-dark pb-20">
      {/* Шапка*/}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black/80 to-transparent z-40">
        <div className="p-4 pt-14">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-white">Уведомления</h1>
          </div>
        </div>
      </div>
      
      {hasNotifications ? (
        <div className="p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-white text-black' 
                  : 'bg-f1-gray text-gray-400'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'unread' 
                  ? 'bg-white text-black' 
                  : 'bg-f1-gray text-gray-400'
              }`}
            >
              Непрочитанные
            </button>
          </div>

          {/* Notifications by date */}
          {["Сегодня", "15 Мая"].map((date) => {
            const dateNotifications = notifications.filter(n => n.date === date);
            if (dateNotifications.length === 0) return null;

            return (
              <div key={date} className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4">{date}</h2>
                <div className="space-y-3">
                  {dateNotifications.map((notification, index) => (
                    <NotificationCard
                      key={`${date}-${index}`}
                      title={notification.title}
                      description={notification.description}
                      time={notification.time}
                      type={notification.type}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 px-4">
          <div className="w-24 h-24 bg-f1-gray rounded-2xl mb-6 flex items-center justify-center">
            <div className="w-12 h-8 bg-f1-gray-light rounded opacity-50"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Пока нет уведомлений</h2>
          <p className="text-gray-400 text-center">Возвращайся позже!</p>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default Notifications;
