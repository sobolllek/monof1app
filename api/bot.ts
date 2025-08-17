import { Telegraf } from 'telegraf';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
  // Открываем мини-приложение по ссылке
  ctx.reply('Добро пожаловать!', {
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Открыть игру',
          web_app: { url: 'https://monof1app.vercel.app' } // Замени на свой URL
        }]
      ]
    }
  });
});

export default async (req: VercelRequest, res: VercelResponse) => {
  await bot.handleUpdate(req.body, res);
};