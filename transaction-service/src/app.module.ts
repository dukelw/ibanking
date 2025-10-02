import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PrismaModule,
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
