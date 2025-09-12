import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { TuitionModule } from './modules/tuition/tuition.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, StudentModule, TuitionModule],
})
export class AppModule {}
