import 'dotenv/config';
import bot from './bot/bot';
import api from './api';

const PORT = process.env.PORT || 3001;

console.log('=== STARTING BOT ===');
console.log('TELEGRAM_BOT_TOKEN exists:', !!process.env.TELEGRAM_BOT_TOKEN);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

// Запуск бота
bot.launch()
  .then(() => {
    console.log('Bot started successfully!');
  })
  .catch((error) => {
    console.error('Failed to start bot:', error);
  });

// Запуск API
api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});