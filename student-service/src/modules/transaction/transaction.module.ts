import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from './transaction.service';

@Module({
  providers: [TransactionService, PrismaService],
  controllers: [TransactionController],
})
export class TransactionModule {}
