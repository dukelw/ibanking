import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TuitionService {
  constructor(private prisma: PrismaService) {}

  createTuition(sID: string, status: string, fee: number) {
    return this.prisma.tuition.create({
      data: {
        sID,
        status,
        fee,
      },
    });
  }

  async getTuitions() {
    return this.prisma.tuition.findMany({
      include: { student: true },
    });
  }
}
