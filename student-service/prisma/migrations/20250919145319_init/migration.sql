-- CreateTable
CREATE TABLE "public"."Student" (
    "id" SERIAL NOT NULL,
    "sID" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "email" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tuition" (
    "id" SERIAL NOT NULL,
    "sID" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "fee" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tuition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentUserId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_sID_key" ON "public"."Student"("sID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNumber_key" ON "public"."Student"("phoneNumber");

-- AddForeignKey
ALTER TABLE "public"."Tuition" ADD CONSTRAINT "Tuition_sID_fkey" FOREIGN KEY ("sID") REFERENCES "public"."Student"("sID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
