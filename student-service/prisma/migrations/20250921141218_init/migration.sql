-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("sID") ON DELETE RESTRICT ON UPDATE CASCADE;
