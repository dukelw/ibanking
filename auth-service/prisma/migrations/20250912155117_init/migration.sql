/*
  Warnings:

  - Made the column `sID` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Student" ALTER COLUMN "sID" SET NOT NULL;
