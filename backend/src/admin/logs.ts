// src/admin/logs.ts
import { Context } from 'telegraf';
import { prisma } from '../db/client';
import { adminStates } from './handlers';
import { findUser } from './helpers';
import { ACTION_TYPES } from './utils';
import { getDateSelectionKeyboard, getUserLogsKeyboard } from './keyboards';

// Handlers from original handlers.ts
export async function handleUserLogsTypeChange(ctx: Context, logType: string) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.username) {
    await ctx.answerCbQuery('Сначала введите username пользователя');
    return;
  }

  adminStates.set(userId, { action: 'user_logs_filter', data: { username: state.data.username, logType } });
  await ctx.answerCbQuery(`Фильтр: ${logType}`);
  await showUserLogs(ctx, state.data.username, logType);
  await ctx.reply('Фильтры для логов:', { reply_markup: getUserLogsKeyboard() });
}

export async function handleUserLogsPeriod(ctx: Context) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.username) {
    await ctx.answerCbQuery('Сначала введите username пользователя');
    return;
  }

  await ctx.editMessageText('Выберите период для просмотра логов:', { reply_markup: getDateSelectionKeyboard() });
  await ctx.answerCbQuery();
}

export async function handleLogsDate(ctx: Context, dateType: string) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.username) {
    await ctx.answerCbQuery('Сначала введите username пользователя');
    return;
  }

  const now = new Date();
  let startDate: Date;
  let endDate: Date = now;

  switch (dateType) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'yesterday':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    default:
      await ctx.answerCbQuery('Неверный тип периода');
      return;
  }

  await showUserLogs(ctx, state.data.username, state.data.logType || 'all', startDate, endDate);
  await ctx.reply('Фильтры для логов:', { reply_markup: getUserLogsKeyboard() });
  await ctx.answerCbQuery(`Период: ${dateType}`);
}

export async function handleLogsDateCustom(ctx: Context) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.username) {
    await ctx.answerCbQuery('Сначала введите username пользователя');
    return;
  }

  adminStates.set(userId, { action: 'user_logs_custom_date', data: { username: state.data.username, logType: state.data.logType || 'all' } });
  await ctx.reply('Введите дату в формате ДД.ММ.ГГГГ или период в формате ДД.ММ.ГГГГ-ДД.ММ.ГГГГ:\n\nПример: "01.12.2024" или "01.12.2024-15.12.2024"');
  await ctx.answerCbQuery();
}

// Handlers from original messageHandler.ts
export async function handleUserLogsUsername(ctx: Context, message: string, logType: string) {
  const username = message.trim().replace('@', '');
  if (!username) {
    return await ctx.reply('Введите username пользователя');
  }

  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  const userId = ctx.from!.id.toString();
  adminStates.set(userId, { action: 'user_logs_filter', data: { username, logType: 'all' } });
  await showUserLogs(ctx, username, 'all');
  await ctx.reply('Фильтры для логов:', { reply_markup: getUserLogsKeyboard() });
}

export async function handleUserLogsCustomDate(ctx: Context, message: string) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.username) {
    await ctx.reply('Ошибка: данные сессии не найдены');
    adminStates.delete(userId);
    return;
  }

  const dateInput = message.trim();
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  if (dateInput.includes('-')) {
    const [startStr, endStr] = dateInput.split('-');
    const [day1, month1, year1] = startStr.split('.').map(Number);
    const [day2, month2, year2] = endStr.split('.').map(Number);

    if (!day1 || !month1 || !year1 || !day2 || !month2 || !year2) {
      return await ctx.reply('Неверный формат периода. Используйте ДД.ММ.ГГГГ-ДД.ММ.ГГГГ');
    }

    startDate = new Date(year1, month1 - 1, day1);
    endDate = new Date(year2, month2 - 1, day2, 23, 59, 59);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
      return await ctx.reply('Неверные даты или период. Проверьте формат и порядок дат.');
    }
  } else {
    const [day, month, year] = dateInput.split('.').map(Number);
    if (!day || !month || !year) {
      return await ctx.reply('Неверный формат даты. Используйте ДД.ММ.ГГГГ');
    }

    startDate = new Date(year, month - 1, day);
    endDate = new Date(year, month - 1, day, 23, 59, 59);

    if (isNaN(startDate.getTime())) {
      return await ctx.reply('Неверная дата. Проверьте формат.');
    }
  }

  await showUserLogs(ctx, state.data.username, state.data.logType || 'all', startDate, endDate);
  adminStates.set(userId, { action: 'user_logs_filter', data: { username: state.data.username, logType: state.data.logType || 'all' } });
  await ctx.reply('Фильтры для логов:', { reply_markup: getUserLogsKeyboard() });
}

export async function showUserLogs(ctx: Context, username: string, logType: string = 'all', startDate?: Date, endDate?: Date) {
  const user = await findUser(username.replace('@', ''));
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  const whereClause: any = { userId: user.id };

  const actionFilters: Record<string, string[]> = {
    trades: ['TRADE_CREATE', 'TRADE_ACCEPT', 'TRADE_REJECT', 'TRADE_COMPLETE'],
    purchases: ['PACK_PURCHASE', 'MARKET_PURCHASE'],
    sales: ['MARKET_SALE'],
    transfers: ['CARDS_GIVE', 'CARDS_TAKE', 'CARDS_TRANSFER'],
    games: ['GAME_START', 'GAME_WIN', 'GAME_LOSE', 'TOURNAMENT_JOIN'],
    all: Object.values(ACTION_TYPES)
  };

  if (actionFilters[logType]) {
    whereClause.action = { in: actionFilters[logType] };
  }

  if (startDate) {
    whereClause.createdAt = { gte: startDate, ...(endDate && { lte: endDate }) };
  }

  const logs = await prisma.log.findMany({
    where: whereClause,
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { username: true, telegramId: true } } }
  });

  const typeNames: Record<string, string> = {
    trades: 'Обмены',
    purchases: 'Покупки',
    sales: 'Продажи',
    transfers: 'Передачи карт',
    games: 'Игры',
    all: 'Все действия'
  };

  let message = `📊 Логи пользователя @${user.username || user.telegramId}\n📝 Тип: ${typeNames[logType]}\n`;

  if (startDate) {
    message += `📅 Период: ${startDate.toLocaleDateString('ru-RU')}`;
    if (endDate && endDate.getTime() !== startDate.getTime()) {
      message += ` - ${endDate.toLocaleDateString('ru-RU')}`;
    }
    message += '\n\n';
  } else {
    message += '\n';
  }

  if (logs.length === 0) {
    message += '📭 Логи не найдены для выбранных параметров';
    return await ctx.reply(message);
  }

  for (const log of logs) {
    const date = log.createdAt.toLocaleString('ru-RU');
    const details = log.details ? `\n📋 ${JSON.stringify(log.details, null, 2)}` : '';
    message += `⏰ ${date}\n🔧 ${log.action}${details}\n---\n`;
  }

  message += `\n📈 Всего записей: ${logs.length}`;

  const maxLength = 4000;
  let parts: string[] = [];
  while (message.length > maxLength) {
    let part = message.substring(0, maxLength);
    let lastNewline = part.lastIndexOf('\n---\n');
    parts.push(message.substring(0, lastNewline > 0 ? lastNewline + 5 : maxLength));
    message = message.substring(lastNewline > 0 ? lastNewline + 5 : maxLength);
  }
  parts.push(message);

  for (const part of parts) {
    await ctx.reply(part);
  }
}

// From original helpers.ts
export async function resetWarnings() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const usersToReset = await prisma.user.findMany({
    where: { warningsCount: { gt: 0 }, updatedAt: { lte: sixMonthsAgo } }
  });

  for (const user of usersToReset) {
    await prisma.user.update({ where: { id: user.id }, data: { warningsCount: 0 } });
  }

  return usersToReset.length;
}