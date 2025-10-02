import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentAccountType } from 'prisma/generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('notification') private notificationQueue: Queue,
  ) {}

  async getTransactions() {
    return this.prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        checkoutId: true,
        tuitionId: true,
        createdAt: true,
        studentId: true,
        paymentUserId: true,
        paymentAccountType: true,
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
        checkoutId: true,
        tuitionId: true,
        createdAt: true,
        studentId: true,
        paymentUserId: true,
        paymentAccountType: true,
      },
    });
  }

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        paymentUserId: dto.paymentUserId,
        paymentAccountType: dto.paymentAccountType,
        studentId: dto.studentId,
        tuitionId: dto.tuitionId,
        checkoutId: dto.checkoutId,
      },
    });

    // đẩy notification async
    await this.notificationQueue.add('sendPaymentEmail', {
      to: dto.payerEmail,
      subject: 'Xác nhận thanh toán học phí thành công',
      body: `
      <h3>Xác nhận thanh toán học phí</h3>
      <p>Sinh viên: ${dto.studentId}</p>
      <p>Số tiền: ${dto.amount.toLocaleString()} VND</p>
      <p>Thời gian: ${new Date().toLocaleString()}</p>
    `,
    });

    return {
      message: 'Transaction created',
      transactionId: transaction.id,
    };
  }
}
