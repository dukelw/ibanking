import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

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

  async getStudentById(sID: string) {
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
        phoneNumber: student.phoneNumber,
        address: student.address,
        dateOfBirth: student.dateOfBirth,
      },
    };
  }
}
