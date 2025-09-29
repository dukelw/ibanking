import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification', // 👈 phải khớp với @Processor('notification')
    }),
  ],
  providers: [EmailService, PrismaService, EmailProcessor],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
