import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async createStudent(sID: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.student.create({
      data: {
        sID,
        password: hashedPassword,
        name,
      },
    });
  }

  async getStudents() {
    return this.prisma.student.findMany();
  }

  async login(sID: string, password: string) {
    const student = await this.prisma.student.findUnique({
      where: { sID },
    });

    console.log(student);

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
        sID: student.sID,
        name: student.name,
      },
    };
  }
}
