// src/admin/helpers.ts (updated, trimmed)
import { prisma } from '../db/client';

export async function findUser(identifier: string) {
  let user = await prisma.user.findFirst({
    where: { username: identifier },
    select: { id: true, username: true, telegramId: true }
  });

  if (!user && !isNaN(parseInt(identifier))) {
    user = await prisma.user.findUnique({
      where: { telegramId: identifier },
      select: { id: true, username: true, telegramId: true }
    });
  }

  return user;
}

export async function findAllUsers() {
  return prisma.user.findMany({ select: { id: true } });
}

export async function updateUsername(telegramId: string, username: string) {
  return prisma.user.update({ where: { telegramId }, data: { username } });
}