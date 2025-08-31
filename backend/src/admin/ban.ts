// src/admin/ban.ts
import { Context } from 'telegraf';
import { prisma } from '../db/client';
import { findUser } from './helpers';
import { logAction, ACTION_TYPES } from './utils';
import { adminStates } from './handlers';
import { getBanKeyboard } from './keyboards';
import { isUserBanned, isUserRestricted } from './utils'; // Moved isUserBanned and isUserRestricted to utils for shared use

// Handlers from original handlers.ts
export async function handleBanMenu(ctx: Context) {
  await ctx.reply('Управление банами и предупреждениями:', {
    reply_markup: getBanKeyboard()
  });
  await ctx.answerCbQuery();
}

export async function handleBanPermanent(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'ban_permanent' });
  await ctx.reply('Введите username пользователя для перманентного бана:\n\nПример: "@username"');
  await ctx.answerCbQuery();
}

export async function handleBanTemporary(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'ban_temporary' });
  await ctx.reply('Введите username пользователя и количество дней для временного бана:\n\nПример: "@username 7"');
  await ctx.answerCbQuery();
}

export async function handleUnban(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'unban' });
  await ctx.reply('Введите username пользователя для разбана:\n\nПример: "@username"');
  await ctx.answerCbQuery();
}

export async function handleWarning(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'warning' });
  await ctx.reply('Введите username пользователя и причину предупреждения:\n\nПример: "@username Нарушение правил чата"');
  await ctx.answerCbQuery();
}

export async function handleUnrestrict(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'unrestrict' });
  await ctx.reply('Введите username пользователя для снятия ограничений:\n\nПример: "@username"');
  await ctx.answerCbQuery();
}

// Handlers from original messageHandler.ts
export async function handleBanPermanentAction(ctx: Context, messageText: string) {
  const username = messageText.trim().replace('@', '');
  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  await banUserPermanently(user.id, 'Перманентный бан (админ)', ctx.from!.id.toString());
  await logAction(ACTION_TYPES.USER_BAN, user.id, { type: 'permanent', reason: 'Админ бан' }, ctx.from!.id.toString());
  await ctx.reply(`✅ Пользователь @${user.username} забанен навсегда`);
}

export async function handleBanTemporaryAction(ctx: Context, messageText: string) {
  const [usernameInput, daysStr] = messageText.split(' ');
  const username = usernameInput.trim().replace('@', '');
  const days = parseInt(daysStr);

  if (isNaN(days) || days <= 0) {
    return await ctx.reply('Неверное количество дней');
  }

  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  await banUserTemporary(user.id, 'Временный бан (админ)', ctx.from!.id.toString(), days);
  await logAction(ACTION_TYPES.USER_BAN, user.id, { type: 'temporary', days, reason: 'Админ бан' }, ctx.from!.id.toString());
  await ctx.reply(`✅ Пользователь @${user.username} забанен на ${days} дней`);
}

export async function handleUnbanAction(ctx: Context, messageText: string) {
  const username = messageText.trim().replace('@', '');
  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  await unbanUser(user.id, ctx.from!.id.toString());
  await ctx.reply(`✅ Пользователь @${user.username} разбанен`);
}

export async function handleWarningAction(ctx: Context, messageText: string) {
  const [usernameInput, ...reasonParts] = messageText.split(' ');
  const username = usernameInput.trim().replace('@', '');
  const reason = reasonParts.join(' ');

  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  const result = await addWarning(user.id, reason, ctx.from!.id.toString());
  await logAction(ACTION_TYPES.WARNING_ADD, user.id, { reason, warnings: result.warnings }, ctx.from!.id.toString());

  let response = `⚠️ Предупреждение выдано @${user.username}\nПричина: ${reason}\nВсего предупреждений: ${result.warnings}`;
  if (result.action === 'restricted') {
    response += '\n🚫 Ограничен на 30 дней';
  } else if (result.action === 'banned') {
    response += '\n🔴 Забанен навсегда';
  }

  await ctx.reply(response);
}

export async function handleUnrestrictAction(ctx: Context, messageText: string) {
  const username = messageText.trim().replace('@', '');
  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  await unrestrictUser(user.id, ctx.from!.id.toString());
  await ctx.reply(`✅ Ограничения сняты с @${user.username}`);
}

// Functions from original helpers.ts
export async function addWarning(userId: number, reason: string, issuedBy: string) {
  await prisma.warning.create({ data: { userId, reason, issuedBy } });

  const user = await prisma.user.update({
    where: { id: userId },
    data: { warningsCount: { increment: 1 }, balance: { decrement: 100 } },
    include: { warnings: { orderBy: { createdAt: 'desc' }, take: 10 } }
  });

  if (user.warningsCount >= 5) {
    await banUserPermanently(userId, '5 предупреждений', issuedBy);
    return { action: 'banned', warnings: user.warningsCount };
  } else if (user.warningsCount >= 3) {
    const restrictUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await prisma.user.update({ where: { id: userId }, data: { restrictedUntil: restrictUntil } });
    return { action: 'restricted', warnings: user.warningsCount };
  }

  return { action: 'warning_added', warnings: user.warningsCount };
}

export async function banUserPermanently(userId: number, reason: string, bannedBy: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { banned: true, bannedUntil: null, restrictedUntil: null }
  });
  await prisma.ban.create({ data: { reason, userId, bannedBy, expiresAt: null } });
}

export async function banUserTemporary(userId: number, reason: string, bannedBy: string, days: number) {
  const bannedUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await prisma.user.update({
    where: { id: userId },
    data: { banned: false, bannedUntil, restrictedUntil: null }
  });
  await prisma.ban.create({ data: { reason, userId, bannedBy, expiresAt: bannedUntil } });
}

export async function unbanUser(userId: number, unbannedBy: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { banned: false, bannedUntil: null, restrictedUntil: null }
  });
  await logAction(ACTION_TYPES.USER_UNBAN, userId.toString(), null, unbannedBy);
}

export async function unrestrictUser(userId: number, unrestrictedBy: string) {
  await prisma.user.update({ where: { id: userId }, data: { restrictedUntil: null } });
  await logAction('USER_UNRESTRICT', userId.toString(), null, unrestrictedBy);
}