// src/admin/coins.ts
import { Context } from 'telegraf';
import { prisma } from '../db/client';
import { adminStates } from './handlers';
import { findUser, findAllUsers } from './helpers';
import { logAction } from './utils';
import { getCoinsKeyboard } from './keyboards';

// Handlers from original handlers.ts
export async function handleCoinsMenu(ctx: Context) {
  await ctx.reply('Управление монетами:', { reply_markup: getCoinsKeyboard() });
  await ctx.answerCbQuery();
}

export async function handleGiveCoinsSingle(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'give_coins_single' });
  await ctx.reply('Введите username пользователя и количество монет через пробел:\n\nПример: "@username 100"');
  await ctx.answerCbQuery();
}

export async function handleGiveCoinsAll(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'give_coins_all' });
  await ctx.reply('Введите количество монет для начисления всем пользователям:\n\nПример: "50"');
  await ctx.answerCbQuery();
}

export async function handleTakeCoinsSingle(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'take_coins_single' });
  await ctx.reply('Введите username пользователя и количество монет для списания через пробел:\n\nПример: "@username 50"');
  await ctx.answerCbQuery();
}

export async function handleTakeCoinsAll(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'take_coins_all' });
  await ctx.reply('Введите количество монет для списания у всех пользователей:\n\nПример: "25"');
  await ctx.answerCbQuery();
}

// Handlers from original messageHandler.ts
export async function handleCoinTransactionSingle(ctx: Context, messageText: string, operation: 'add' | 'remove') {
  const [usernameInput, amountStr] = messageText.split(' ');
  const username = usernameInput.replace('@', '');
  const amount = parseInt(amountStr);

  if (isNaN(amount) || amount <= 0) {
    return await ctx.reply('Неверное количество монет');
  }

  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  const data = operation === 'add' ? { balance: { increment: amount } } : { balance: { decrement: amount } };
  await prisma.user.update({ where: { id: user.id }, data });
  await logAction('BALANCE_UPDATE', user.id, { amount, operation }, ctx.from!.id.toString());

  const actionText = operation === 'add' ? 'начислено' : 'списано';
  await ctx.reply(`✅ ${amount} монет ${actionText} пользователю @${user.username}`);
}

export async function handleCoinTransactionAll(ctx: Context, messageText: string, operation: 'add' | 'remove') {
  const amount = parseInt(messageText);
  if (isNaN(amount) || amount <= 0) {
    return await ctx.reply('Неверное количество монет');
  }

  const users = await findAllUsers();
  const data = operation === 'add' ? { balance: { increment: amount } } : { balance: { decrement: amount } };

  for (const user of users) {
    await prisma.user.update({ where: { id: user.id }, data });
    await logAction('BALANCE_UPDATE', user.id, { amount, operation, mass: true }, ctx.from!.id.toString());
  }

  const actionText = operation === 'add' ? 'начислено' : 'списано';
  await ctx.reply(`✅ ${amount} монет ${actionText} всем пользователям (${users.length})`);
}