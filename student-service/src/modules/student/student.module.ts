import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  providers: [StudentService, PrismaService],
  controllers: [StudentController],
})
export class StudentModule {}
