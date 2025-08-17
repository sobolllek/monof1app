// backend/index.js
require('dotenv').config(); // Загружает .env
const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

// Подключаемся к Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Создаём бота
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Команда /start
bot.start((ctx) => {
  ctx.reply('🚀 Привет! Я твой бот. Пиши мне что угодно – сохраню в Supabase!');
});

// Сохраняем сообщения в базу
bot.on('text', async (ctx) => {
  const { error } = await supabase
    .from('messages')
    .insert({ text: ctx.message.text });

  ctx.reply(error ? 'Ошибка 😢' : 'Сообщение в базе! ✅');
});

// Запускаем бота
bot.launch();
console.log('Бот запущен!');
