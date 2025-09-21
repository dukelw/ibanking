import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
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
    studentId: string,
    tuitionId: number,
    payerId: number,
    payerType: 'STUDENT' | 'OTHER',
  ) {
    return this.prisma.$transaction(async (tx) => {
      const tuition = await tx.tuition.findUnique({ where: { id: tuitionId } });
      if (!tuition) throw new NotFoundException('Tuition not found');
      if (tuition.status === 'PAYED') throw new Error('Already paid');

      console.log(studentId);
      const student = await tx.student.findUnique({
        where: { sID: studentId },
      });
      if (!student) throw new NotFoundException('Student not found');

      if (payerType === 'STUDENT') {
        const payer = await tx.student.findUnique({ where: { id: payerId } });
        if (!payer) throw new NotFoundException('Payer student not found');
        if (payer.balance < tuition.fee) throw new Error('Not enough balance');

        console.log(payerId, payer);
        await tx.student.update({
          where: { id: payerId },
          data: { balance: { decrement: tuition.fee } },
        });
      } else if (payerType === 'OTHER') {
        // gọi sang auth-service để trừ tiền
        try {
          await firstValueFrom(
            this.httpService.post(
              `${process.env.AUTH_SERVICE}/auth/${payerId}/deduct-balance`,
              { amount: tuition.fee },
            ),
          );
        } catch (err) {
          throw new Error(
            `Auth service error: ${err.response?.data?.message || err.message}`,
          );
        }
      }

      const updatedTuition = await tx.tuition.update({
        where: { id: tuitionId },
        data: { status: 'PAID' },
      });

      await tx.transaction.create({
        data: {
          amount: tuition.fee,
          paymentUserId: payerId,
          paymentAccountType: payerType,
          studentId: student.sID,
        },
      });

      return {
        message: 'Payment success',
        tuitionId: updatedTuition.id,
        tuitionStatus: updatedTuition.status,
      };
    });
  }
}
