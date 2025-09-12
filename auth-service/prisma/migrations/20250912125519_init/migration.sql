-- CreateTable
CREATE TABLE "public"."Tuition" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,

    CONSTRAINT "Tuition_pkey" PRIMARY KEY ("id")
);
