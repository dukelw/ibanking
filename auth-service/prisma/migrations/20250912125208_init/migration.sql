-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" INTEGER NOT NULL,
    "name" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
