-- CreateEnum
CREATE TYPE "public"."PaymentAccountType" AS ENUM ('STUDENT', 'OTHER');

-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "paymentAccountType" "public"."PaymentAccountType";

-- AlterTable
ALTER TABLE "public"."Tuition" ALTER COLUMN "fee" SET DEFAULT 0;
