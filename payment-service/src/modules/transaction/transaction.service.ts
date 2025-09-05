import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(amount: number, status: string) {
    return this.prisma.transaction.create({
      data: { amount, status },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }
}
