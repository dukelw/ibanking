import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from './modules/email/email.module';
import { OtpModule } from './modules/otp/otp.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmailModule,
    OtpModule,
  ],
})
export class AppModule {}
