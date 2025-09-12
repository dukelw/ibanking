import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TuitionService } from './tuition.service';
import { TuitionController } from './tuition.controller';

@Module({
  providers: [TuitionService, PrismaService],
  controllers: [TuitionController],
})
export class TuitionModule {}
