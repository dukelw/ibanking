import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';
import { TuitionModule } from './modules/tuition/tuition.module';

@Module({
  imports: [PrismaModule, StudentModule, TuitionModule],
})
export class AppModule {}
