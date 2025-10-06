import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import Redlock from 'redlock';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    @Inject('REDLOCK') private readonly redlock: Redlock,
  ) {}

  async createStudent(
    sID: string,
    password: string,
    name: string,
    email?: string,
    balance?: number,
    phoneNumber?: string,
    address?: string,
    dateOfBirth?: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.student.create({
      data: {
        sID,
        password: hashedPassword,
        name,
        balance,
        email,
        phoneNumber,
        address,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
      select: {
        id: true,
        sID: true,
        name: true,
        email: true,
        balance: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
      },
    });
  }

  async getStudents() {
    return this.prisma.student.findMany({
      select: {
        id: true,
        sID: true,
        name: true,
        balance: true,
        email: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
      },
    });
  }

  async getStudentById(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        sID: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
        balance: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async getStudentByStudentId(sID: string) {
    const student = await this.prisma.student.findUnique({
      where: { sID },
      select: {
        id: true,
        sID: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        dateOfBirth: true,
        balance: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${sID} not found`);
    }

    return student;
  }

  async login(sID: string, password: string) {
    const student = await this.prisma.student.findUnique({
      where: { sID },
    });

    if (!student) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return {
      message: 'Login successful',
      student: {
        id: student.id,
        sID: student.sID,
        name: student.name,
        email: student.email,
        phone: student.phoneNumber,
        address: student.address,
        dateOfBirth: student.dateOfBirth,
        balance: student.balance,
      },
    };
  }

  async payTuition(
    payerEmail: string,
    studentId: string,
    tuitionId: number,
    payerId: number,
    payerType: 'STUDENT' | 'OTHER',
    checkoutId: string,
  ) {
    const payerLockKey = `lock:user:${payerId}`;
    const tuitionLockKey = `lock:tuition:${tuitionId}`;

    // ⏱ thời gian giữ khóa tối đa 5 giây
    const ttl = 5000;

    // ⚙️ Acquire cả hai khóa cùng lúc
    const lock = await this.redlock.lock([payerLockKey, tuitionLockKey], ttl);

    try {
      // --- KHỐI CODE AN TOÀN ---
      const tuition = await this.prisma.tuition.findUnique({
        where: { id: tuitionId },
      });
      if (!tuition) throw new Error('Tuition not found');
      if (tuition.status === 'PAID') throw new Error('Already paid');

      const student = await this.prisma.student.findUnique({
        where: { sID: studentId },
      });
      if (!student) throw new Error('Student not found');

      // Deduct balance
      if (payerType === 'STUDENT') {
        const res = await this.prisma.student.updateMany({
          where: { id: payerId, balance: { gte: tuition.fee } },
          data: { balance: { decrement: tuition.fee } },
        });
        if (res.count === 0) throw new Error('Not enough balance');
      } else {
        await firstValueFrom(
          this.httpService.post(
            `${process.env.USER_SERVICE}/user/${payerId}/deduct-balance`,
            { amount: tuition.fee },
          ),
        );
      }

      // Gọi TransactionService
      let transaction;
      try {
        transaction = await firstValueFrom(
          this.httpService.post(
            `${process.env.TRANSACTION_SERVICE}/transactions`,
            {
              amount: tuition.fee,
              paymentUserId: payerId,
              paymentAccountType: payerType,
              studentId: student.sID,
              tuitionId: tuition.id,
              checkoutId,
              payerEmail,
            },
          ),
        );
      } catch (err) {
        // rollback
        if (payerType === 'STUDENT') {
          await this.prisma.student.update({
            where: { id: payerId },
            data: { balance: { increment: tuition.fee } },
          });
        } else {
          await firstValueFrom(
            this.httpService.post(
              `${process.env.USER_SERVICE}/user/${payerId}/refund-balance`,
              { amount: tuition.fee },
            ),
          );
        }
        throw err;
      }

      await this.prisma.tuition.update({
        where: { id: tuition.id },
        data: { status: 'PAID' },
      });

      return {
        message: 'Payment success',
        transactionId: transaction.data.id,
        success: true,
      };
    } finally {
      // 🔓 Giải phóng khóa
      await lock.unlock().catch(() => {});
    }
  }
}
