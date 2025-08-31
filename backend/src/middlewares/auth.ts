import { prisma } from '../db/client';

export const checkSubscription = async (telegramId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { telegramId } });
  return user?.isSubscribed || false;
};