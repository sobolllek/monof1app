import React, { useEffect } from 'react';
import useTelegramWebApp from '../hooks/useTelegramWebApp';

const TelegramTitle: React.FC = () => {
  const { isTelegramWebApp } = useTelegramWebApp();

  useEffect(() => {
    if (!isTelegramWebApp) return;

    // Ждем, пока Telegram загрузит свои кнопки
    const checkAndInsertTitle = () => {
      const tgHeader = document.querySelector('.tg-headered, .tg-navbar');
      if (!tgHeader) {
        setTimeout(checkAndInsertTitle, 100); // Проверяем снова через 100 мс
        return;
      }

      // Удаляем старый заголовок (если был)
      const oldTitle = tgHeader.querySelector('.mono-f1-title');
      if (oldTitle) oldTitle.remove();

      // Создаем новый заголовок
      const title = document.createElement('div');
      title.className = 'mono-f1-title';
      title.textContent = 'MONO F1';

      // Вставляем его перед кнопкой "Меню" (или в центр)
      const menuBtn = tgHeader.querySelector('[aria-label="Menu"], .menu-button');
      if (menuBtn) {
        tgHeader.insertBefore(title, menuBtn);
      } else {
        tgHeader.appendChild(title); // Если кнопки нет, просто добавляем
      }
    };

    checkAndInsertTitle();
  }, [isTelegramWebApp]);

  return null; // Не рендерим ничего в React-DOM
};

export default TelegramTitle;
