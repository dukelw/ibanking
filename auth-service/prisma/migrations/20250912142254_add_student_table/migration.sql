/*
  Warnings:

  - A unique constraint covering the columns `[sID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE "public".student_id_seq;
ALTER TABLE "public"."Student" ADD COLUMN     "sID" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('"public".student_id_seq');
ALTER SEQUENCE "public".student_id_seq OWNED BY "public"."Student"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Student_sID_key" ON "public"."Student"("sID");
