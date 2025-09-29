import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    @InjectQueue('notification') private notificationQueue: Queue, // queue gửi mail
  ) {}

  async createStudent(
    sID: string,
    password: string,
    name: string,
    email?: string,
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
  ) {
    return this.prisma.$transaction(async (tx) => {
      const tuition = await tx.tuition.findUnique({ where: { id: tuitionId } });
      if (!tuition) throw new NotFoundException('Tuition not found');
      if (tuition.status === 'PAID') throw new Error('Already paid');

      const student = await tx.student.findUnique({
        where: { sID: studentId },
      });
      if (!student) throw new NotFoundException('Student not found');

      if (payerType === 'STUDENT') {
        const payer = await tx.student.findUnique({ where: { id: payerId } });
        if (!payer) throw new NotFoundException('Payer student not found');
        if (payer.balance < tuition.fee) throw new Error('Not enough balance');

        const res = await tx.student.updateMany({
          where: { id: payerId, balance: { gte: tuition.fee } },
          data: { balance: { decrement: tuition.fee } },
        });
        if (res.count === 0) throw new Error('Not enough balance');
      } else if (payerType === 'OTHER') {
        await firstValueFrom(
          this.httpService.post(
            `${process.env.AUTH_SERVICE}/auth/${payerId}/deduct-balance`,
            { amount: tuition.fee },
          ),
        );
      }

      const updatedTuition = await tx.tuition.updateMany({
        where: { id: tuitionId, status: 'PENDING' },
        data: { status: 'PAID' },
      });

      if (updatedTuition.count === 0) throw new Error('Already paid');

      const transaction = await tx.transaction.create({
        data: {
          amount: tuition.fee,
          paymentUserId: payerId,
          paymentAccountType: payerType,
          studentId: student.sID,
        },
      });

      if (payerEmail !== student.email) {
        // 🚀 Publish job vào queue sau khi tạo transaction
        await this.notificationQueue.add('sendPaymentEmail', {
          to: student.email, // hoặc email payer
          subject: 'Xác nhận thanh toán học phí thành công',
          body: `
          <h3>Xác nhận thanh toán học phí</h3>
          <p>Sinh viên: ${student.name} (${student.sID})</p>
          <p>Số tiền: ${tuition.fee.toLocaleString()} VND</p>
          <p>Thời gian: ${new Date().toLocaleString()}</p>
        `,
        });
      }

      // 🚀 Publish job vào queue sau khi tạo transaction
      await this.notificationQueue.add('sendPaymentEmail', {
        to: payerEmail, // hoặc email payer
        subject: 'Xác nhận thanh toán học phí thành công',
        body: `
          <h3>Xác nhận thanh toán học phí</h3>
          <p>Sinh viên: ${student.name} (${student.sID})</p>
          <p>Số tiền: ${tuition.fee.toLocaleString()} VND</p>
          <p>Thời gian: ${new Date().toLocaleString()}</p>
        `,
      });

      return {
        message: 'Payment success',
        transactionId: transaction.id,
      };
    });
  }
}
