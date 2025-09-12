import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  createStudent(id: number, name?: string) {
    return this.prisma.student.create({
      data: {
        id,
        name,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
  async getStudents() {
    return this.prisma.student.findMany();
  }
}
