import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';
import { TuitionModule } from './modules/tuition/tuition.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [PrismaModule, StudentModule, TuitionModule, TransactionModule],
})
export class AppModule {}
