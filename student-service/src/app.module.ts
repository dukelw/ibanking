import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';
import { TuitionModule } from './modules/tuition/tuition.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PrismaModule,
    StudentModule,
    TuitionModule,
    TransactionModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
  ],
})
export class AppModule {}
