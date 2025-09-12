/*
  Warnings:

  - Made the column `password` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Student" ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" DROP DEFAULT;
