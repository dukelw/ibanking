/*
  Warnings:

  - Added the required column `sID` to the `Tuition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Tuition" ADD COLUMN     "sID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Tuition" ADD CONSTRAINT "Tuition_sID_fkey" FOREIGN KEY ("sID") REFERENCES "public"."Student"("sID") ON DELETE RESTRICT ON UPDATE CASCADE;
