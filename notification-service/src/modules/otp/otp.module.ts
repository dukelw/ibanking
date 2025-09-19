import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  providers: [OtpService, PrismaService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
