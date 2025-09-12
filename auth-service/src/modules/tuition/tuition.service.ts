import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TuitionService {
  constructor(private prisma: PrismaService) {}

  createTuition(status: string, fee: number) {
    return this.prisma.tuition.create({
      data: {
        status,
        fee,
      },
    });
  }

  async getTuitions() {
    return this.prisma.tuition.findMany();
  }
}
