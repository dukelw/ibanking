import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import Redis from 'ioredis';
import Redlock from 'redlock';

@Module({
  imports: [HttpModule],
  providers: [
    StudentService,
    PrismaService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () =>
        new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        }),
    },

    {
      provide: 'REDLOCK',
      inject: ['REDIS_CLIENT'],
      useFactory: (client: Redis) =>
        new Redlock([client], {
          retryCount: 3,
          retryDelay: 200,
        }),
    },
  ],
  controllers: [StudentController],
})
export class StudentModule {}
