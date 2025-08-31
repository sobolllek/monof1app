-- AlterTable
ALTER TABLE "public"."Card" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Log" ADD COLUMN     "details" JSONB,
ADD COLUMN     "performedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
