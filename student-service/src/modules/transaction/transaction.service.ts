import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentAccountType } from 'prisma/generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async getTransactions() {
    return this.prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        paymentUserId: true,
        paymentAccountType: true,
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
          },
        },
      },
    });
  }

  async getTransactionById(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        paymentUserId: true,
        paymentAccountType: true,
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  async getTransactionOfUser(payerType: string, userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        paymentUserId: userId,
        paymentAccountType: payerType as PaymentAccountType,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        paymentUserId: true,
        paymentAccountType: true,
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
          },
        },
      },
    });
  }
}
