import { Module } from '@nestjs/common';
import { TuitionService } from './tuition.service';
import { TuitionController } from './tuition.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TuitionService, PrismaService],
  controllers: [TuitionController],
})
export class TuitionModule {}
