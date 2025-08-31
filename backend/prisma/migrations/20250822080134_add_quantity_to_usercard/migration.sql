/*
  Warnings:

  - A unique constraint covering the columns `[userId,cardId]` on the table `UserCard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Card" ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."UserCard" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Ban_userId_idx" ON "public"."Ban"("userId");

-- CreateIndex
CREATE INDEX "Ban_expiresAt_idx" ON "public"."Ban"("expiresAt");

-- CreateIndex
CREATE INDEX "Card_type_idx" ON "public"."Card"("type");

-- CreateIndex
CREATE INDEX "Card_rarity_idx" ON "public"."Card"("rarity");

-- CreateIndex
CREATE INDEX "Card_packId_idx" ON "public"."Card"("packId");

-- CreateIndex
CREATE INDEX "Card_isDroppable_idx" ON "public"."Card"("isDroppable");

-- CreateIndex
CREATE INDEX "Card_year_idx" ON "public"."Card"("year");

-- CreateIndex
CREATE INDEX "Log_userId_idx" ON "public"."Log"("userId");

-- CreateIndex
CREATE INDEX "Log_action_idx" ON "public"."Log"("action");

-- CreateIndex
CREATE INDEX "Log_createdAt_idx" ON "public"."Log"("createdAt");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "public"."Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "public"."Transaction"("type");

-- CreateIndex
CREATE UNIQUE INDEX "UserCard_userId_cardId_key" ON "public"."UserCard"("userId", "cardId");

-- CreateIndex
CREATE INDEX "Warning_userId_idx" ON "public"."Warning"("userId");

-- CreateIndex
CREATE INDEX "Warning_createdAt_idx" ON "public"."Warning"("createdAt");
