/*
  Warnings:

  - Added the required column `type` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Card" ADD COLUMN     "dropLimit" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "isDroppable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "team" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 2024;
