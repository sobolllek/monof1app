// src/admin/utils.ts
import { Context } from 'telegraf';
import { prisma } from '../db/client';
import { getAdminKeyboard } from './keyboards';
import { adminStates } from './handlers';
import { resetWarnings } from './logs'; // Import resetWarnings from logs.ts

// Список ID администраторов
const ADMIN_IDS = process.env.ADMIN_IDS?.split(',') || [];

// Типы действий для логирования
export const ACTION_TYPES = {
  TRADE_CREATE: 'TRADE_CREATE',
  TRADE_ACCEPT: 'TRADE_ACCEPT',
  TRADE_REJECT: 'TRADE_REJECT',
  TRADE_COMPLETE: 'TRADE_COMPLETE',
  PACK_PURCHASE: 'PACK_PURCHASE',
  MARKET_PURCHASE: 'MARKET_PURCHASE',
  MARKET_SALE: 'MARKET_SALE',
  CARDS_GIVE: 'CARDS_GIVE',
  CARDS_TAKE: 'CARDS_TAKE',
  CARDS_TRANSFER: 'CARDS_TRANSFER',
  GAME_START: 'GAME_START',
  GAME_WIN: 'GAME_WIN',
  GAME_LOSE: 'GAME_LOSE',
  TOURNAMENT_JOIN: 'TOURNAMENT_JOIN',
  BALANCE_UPDATE: 'BALANCE_UPDATE',
  CARD_CREATE: 'CARD_CREATE',
  PACK_CREATE: 'PACK_CREATE',
  USER_BAN: 'USER_BAN',
  USER_UNBAN: 'USER_UNBAN',
  WARNING_ADD: 'WARNING_ADD'
};

export async function isAdmin(userId: string): Promise<boolean> {
  if (ADMIN_IDS.includes(userId)) return true;

  const user = await prisma.user.findUnique({ where: { telegramId: userId }, select: { isAdmin: true } });
  return user?.isAdmin || false;
}

export async function isUserBanned(telegramId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { telegramId }, select: { banned: true, bannedUntil: true } });
  if (!user) return false;

  if (user.banned) return true;
  if (user.bannedUntil && user.bannedUntil > new Date()) return true;

  if (user.bannedUntil && user.bannedUntil <= new Date()) {
    await prisma.user.update({ where: { telegramId }, data: { bannedUntil: null } });
  }

  return false;
}

export async function isUserRestricted(telegramId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { telegramId }, select: { restrictedUntil: true } });
  if (!user) return false;

  if (user.restrictedUntil && user.restrictedUntil > new Date()) return true;

  if (user.restrictedUntil && user.restrictedUntil <= new Date()) {
    await prisma.user.update({ where: { telegramId }, data: { restrictedUntil: null } });
  }

  return false;
}

export async function canUserInteract(telegramId: string): Promise<{
  canInteract: boolean;
  reason?: string;
  bannedUntil?: Date;
  restrictedUntil?: Date;
  warnings?: number;
}> {
  if (await isUserBanned(telegramId)) {
    const user = await prisma.user.findUnique({
      where: { telegramId },
      select: { bannedUntil: true }
    });

    return {
      canInteract: false,
      reason: user?.bannedUntil ? `Забанен до ${user.bannedUntil.toLocaleString('ru-RU')}` : 'Забанен навсегда',
      bannedUntil: user?.bannedUntil ?? undefined
    };
  }

  if (await isUserRestricted(telegramId)) {
    const user = await prisma.user.findUnique({
      where: { telegramId },
      select: { restrictedUntil: true, warningsCount: true }
    });

    return {
      canInteract: false,
      reason: user?.restrictedUntil ? `Ограничен до ${user.restrictedUntil.toLocaleString('ru-RU')} (${user?.warningsCount} предупреждений)` : undefined,
      restrictedUntil: user?.restrictedUntil ?? undefined,
      warnings: user?.warningsCount
    };
  }

  return { canInteract: true };
}

export async function logAction(action: string, userId: string | number, details?: any, performedBy?: string) {
  let id: number;
  if (typeof userId === 'string') {
    const user = await prisma.user.findUnique({ where: { telegramId: userId }, select: { id: true } });
    if (!user) {
      console.warn(`[WARN] logAction: User with telegramId ${userId} not found`);
      return;
    }
    id = user.id;
  } else {
    id = userId;
  }

  await prisma.log.create({ data: { action, userId: id, details, performedBy: performedBy || 'system' } });
}

export async function scheduleWarningReset() {
  setInterval(async () => {
    try {
      const resetCount = await resetWarnings(); // Now properly imported from logs.ts
      if (resetCount > 0) console.log(`Сброшены предупреждения для ${resetCount} пользователей`);
    } catch (error) {
      console.error('Ошибка при сбросе предупреждений:', error);
    }
  }, 24 * 60 * 60 * 1000);
}

export async function handleBackToAdmin(ctx: Context) {
  const userId = ctx.from!.id.toString();
  adminStates.delete(userId);
  await ctx.reply('Панель администратора:', { reply_markup: getAdminKeyboard() });
  await ctx.answerCbQuery();
}