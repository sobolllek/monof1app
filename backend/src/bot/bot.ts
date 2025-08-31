import { Telegraf } from 'telegraf';
import { prisma } from '../db/client';
import { updateUsername } from '../admin/helpers';
import { 
  handleAdminCommand, 
  handleAdminCallback 
} from '../admin/handlers';
import { adminMessageMiddleware } from '../admin/messageHandler';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// Функция проверки подписки
async function isUserSubscribed(userId: string): Promise<boolean> {
  try {
    const chatMember = await bot.telegram.getChatMember(
      process.env.TELEGRAM_CHANNEL_ID!,
      parseInt(userId)
    );
    return ['member', 'administrator', 'creator'].includes(chatMember.status);
  } catch (error) {
    console.error('Ошибка проверки подписки:', error);
    return false;
  }
}

// bot.ts - в начале обработки сообщений
bot.use(async (ctx, next) => {
  if (ctx.from) {
    const userId = ctx.from.id.toString();
    const username = ctx.from.username;
    
    // Автоматически обновляем username если он изменился
    if (username) {
      await prisma.user.updateMany({
        where: { telegramId: userId },
        data: { username }
      });
    }
  }
  
  return next();
});

bot.command('admin', handleAdminCommand);
bot.action(/^admin_/, handleAdminCallback);
bot.action(/^edit_card_/, handleAdminCallback);
bot.action('admin_confirm_action', handleAdminCallback);
bot.action('admin_cancel_action', handleAdminCallback);
bot.action('confirm_action', handleAdminCallback);
bot.action('cancel_action', handleAdminCallback);
bot.action(/^user_logs_/, handleAdminCallback);
bot.action(/^logs_date_/, handleAdminCallback);
bot.use(adminMessageMiddleware());

// Обработка команды /start
bot.start(async (ctx) => {
  const userId = ctx.from.id.toString();
  const username = ctx.from.username || 'пользователь';
  const isSubscribed = await isUserSubscribed(userId);

  // Проверяем, существует ли пользователь уже в базе
  const existingUser = await prisma.user.findUnique({
    where: { telegramId: userId }
  });

  const isNewUser = !existingUser;

  await prisma.user.upsert({
    where: { telegramId: userId },
    create: { 
      telegramId: userId, 
      username: ctx.from.username,
      isSubscribed 
    },
    update: { isSubscribed },
  });

  // Разное приветствие для новых и существующих пользователей
  if (isNewUser) {
    await ctx.reply(
      `*Привет, ${username}, любитель скорости и коллекционирования!* 🏎️

Добро пожаловать в MonoF1 - карточный бот по Формуле-1! 

Чтобы получить доступ ко всем функциям, подпишись на наш канал

Здесь тебя ждут:
• 🃏 Digital коллекционные карты команд и пилотов
• 🎮 Увлекательные мини-игры
• 🏆 Турниры и соревнования
• 👥 Крутое комьюнити фанатов F1
• 💰 Ежедневные бонусы и награды

Подписывайся и погнали!🚦🏁
      `,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { 
                text: 'Подписаться на канал', 
                url: `https://t.me/${process.env.TELEGRAM_CHANNEL_ID?.replace('@', '')}` 
              },
              { 
                text: 'Я подписался', 
                callback_data: 'check_subscription' 
              }
            ]
          ],
        },
      }
    );
  } else {
    // Для существующих пользователей проверяем подписку
    if (isSubscribed) {
      await ctx.reply(
        `*С возвращением, ${username}!* 🏎️✨

Рады снова видеть тебя в MonoF1 - карточном боте по Формуле-1!

Твоя коллекция карт и прогресс сохранены. Продолжаем гонку! 🚦🏁

Не забывай заходить за ежедневными наградами и участвовать в новых турнирах!
        `,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🎮 Как играть', callback_data: 'how_to_play' },
                { text: '💬 Чат сообщества', url: 'https://t.me/monof1_community' }
              ],
              [
                { text: '🚀 Открыть приложение', web_app: { url: 'https://monof1app.vercel.app' } }
              ]
            ],
          },
        }
      );
    } else {
      // Если существующий пользователь отписался
      await ctx.reply(
        `*С возвращением, ${username}!* 🏎️

Для продолжения игры нужно снова подписаться на наш канал
        `,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { 
                  text: 'Подписаться на канал', 
                  url: `https://t.me/${process.env.TELEGRAM_CHANNEL_ID?.replace('@', '')}` 
                },
                { 
                  text: 'Я подписался', 
                  callback_data: 'check_subscription' 
                }
              ]
            ],
          },
        }
      );
    }
  }
  
  if (!isSubscribed) {
    await ctx.reply('Чтобы запустить приложение, нужно подписаться на канал');
  }
});

// Обработка кнопки проверки подписки
bot.action('check_subscription', async (ctx) => {
  try {
    const userId = ctx.from.id.toString();
    const isSubscribed = await isUserSubscribed(userId);

    if (isSubscribed) {
      // Основные кнопки после подписки
      await ctx.reply('Спасибо за подписку! Теперь вы можете открыть приложение\n\nПрисоединяйтесь к нашему сообществу!\n\nИспользуйте /help если возникли проблемы', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🎮 Как играть', callback_data: 'how_to_play' },
              { text: '💬 Чат сообщества', url: 'https://t.me/monof1_community' }
            ],
            [
              { text: '🚀 Открыть приложение', web_app: { url: 'https://monof1app.vercel.app' } }
            ]
          ]
        }
      });
      
      await prisma.user.update({
        where: { telegramId: userId },
        data: { isSubscribed: true },
      });
    } else {
      await ctx.answerCbQuery('Вы ещё не подписаны. Пожалуйста, подпишитесь на канал', { 
        show_alert: true 
      });
    }
  } catch (error) {
    console.error(error);
    await ctx.answerCbQuery('Извините, произошла ошибка при проверке подписки', {
      show_alert: true
    });
  }
});

// Обработка кнопки "Как играть" - показываем подменю
bot.action('how_to_play', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('🎮 *Что вас интересует?*', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🃏 Паки карт', callback_data: 'card_packs_info' },
          { text: '🏆 Карты пилотов', callback_data: 'driver_cards_info' }
        ],
        [
          { text: '🏁 Карты команд', callback_data: 'team_cards_info' },
          { text: '📚 Обучение', callback_data: 'tutorial_info' }
        ],
        [
          { text: '↩️ Назад', callback_data: 'back_to_main' }
        ]
      ]
    }
  });
});

// Обработка информации о паках карт
bot.action('card_packs_info', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('🃏 *Паки карт:*\n\n• **Стартовый пак** - базовые карты для начала игры\n• **Редкий пак** - карты повышенной редкости с улучшенными характеристиками\n• **Легендарный пак** - эксклюзивные карты легендарных пилотов\n• **Тематические паки** - специальные выпуски к Гран-При\n\nПаки можно получать за достижения, покупки или ежедневные награды!', 
  {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '↩️ Назад к обучению', callback_data: 'how_to_play' }
        ]
      ]
    }
  });
});

// Обработка информации о картах пилотов
bot.action('driver_cards_info', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('🏆 *Карты пилотов:*\n\nКаждая карта пилота содержит:\n• 📊 Характеристики (скорость, обгон, защита)\n• 📈 Уровень и редкость\n• 🎯 Особые способности\n• 📖 Статистику выступлений\n\nСобирайте полную коллекцию всех пилотов Формулы-1!', 
  {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '↩️ Назад к обучению', callback_data: 'how_to_play' }
        ]
      ]
    }
  });
});

// Обработка информации о картах команд
bot.action('team_cards_info', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('🏁 *Карты команд:*\n\nКарты команд предоставляют:\n• 🏎️ Бонусы к характеристикам пилотов\n• 🎨 Уникальный дизайн и историю\n• 💰 Экономические преимущества\n• 🤝 Синергию с картами пилотов\n\nСоздайте свою dream-команду!', 
  {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '↩️ Назад к обучению', callback_data: 'how_to_play' }
        ]
      ]
    }
  });
});

// Обработка обучения
bot.action('tutorial_info', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('📚 *Обучение и гайды:*\n\n1. **Начало игры** - как открывать первые паки\n2. **Гонки** - участие в заездах и турнирах\n3. **Трейдинг** - обмен картами с другими игроками\n4. **Прокачка** - улучшение карт и характеристик\n5. **Стратегии** - построение winning-комбинаций\n\nВсё для вашего успеха в MonoF1!', 
  {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '↩️ Назад к обучению', callback_data: 'how_to_play' }
        ]
      ]
    }
  });
});

// Возврат к главному меню
bot.action('back_to_main', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.deleteMessage();
  
  // Проверяем подписку перед показом меню
  const userId = ctx.from.id.toString();
  const isSubscribed = await isUserSubscribed(userId);
  
  if (isSubscribed) {
    await ctx.reply('Спасибо за подписку! Теперь вы можете открыть приложение\n\nПрисоединяйтесь к нашему сообществу!\n\nИспользуйте /help если возникли проблемы', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🎮 Как играть', callback_data: 'how_to_play' },
            { text: '💬 Чат сообщества', url: 'https://t.me/monof1_community' }
          ],
          [
            { text: '🚀 Открыть приложение', web_app: { url: 'https://monof1app.vercel.app' } }
          ]
        ]
      }
    });
  } else {
    await ctx.reply('Для доступа к приложению нужно подписаться на канал', {
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: 'Подписаться на канал', 
              url: `https://t.me/${process.env.TELEGRAM_CHANNEL_ID?.replace('@', '')}` 
            },
            { 
              text: 'Я подписался', 
              callback_data: 'check_subscription' 
            }
          ]
        ]
      }
    });
  }
});

// Обработка команды /help - только для проблем
bot.help(async (ctx) => {
  await ctx.reply(
    'Возникли проблемы или вопросы? Наша поддержка всегда готова помочь!',
    {
      reply_markup: {
        inline_keyboard: [[
          { 
            text: '🆘 Написать в поддержку', 
            url: 'https://t.me/monof1_chanel' 
          },
          {
            text: '💬 Чат сообщества',
            url: 'https://t.me/monof1_community'
          }
        ]]
      }
    }
  );
});

// Обработка обычных сообщений
bot.on('text', async (ctx) => {
  const userId = ctx.from.id.toString();
  const isSubscribed = await isUserSubscribed(userId);
  
  if (!isSubscribed) {
    await ctx.reply('Чтобы запустить приложение, нужно подписаться на канал');
  } else {
    await ctx.reply('Добро пожаловать в MonoF1! Используйте кнопки меню для навигации.');
  }
});

export default bot;