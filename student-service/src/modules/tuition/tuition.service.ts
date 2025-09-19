import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TuitionService {
  constructor(private prisma: PrismaService) {}

  async createTuition(
    sID: string,
    fee: number,
    status: string = 'PENDING',
    startTime?: Date,
    endTime?: Date,
  ) {
    // Check if student exists
    const student = await this.prisma.student.findUnique({
      where: { sID },
    });

    if (!student) {
      throw new NotFoundException(`Student with sID ${sID} not found`);
    }

    // Create tuition record
    return this.prisma.tuition.create({
      data: {
        sID,
        status,
        fee,
        startTime: startTime ?? new Date(),
        endTime: endTime ?? new Date(),
      },
      include: {
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            dateOfBirth: true,
          },
        },
      },
    });
  }

  async getTuitions() {
    return this.prisma.tuition.findMany({
      include: {
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            dateOfBirth: true,
          },
        },
      },
    });
  }

  async getTuitionByStudentId(sID: string) {
    const tuition = await this.prisma.tuition.findMany({
      where: { sID },
      include: {
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            dateOfBirth: true,
          },
        },
      },
    });

    if (!tuition || tuition.length === 0) {
      throw new NotFoundException(
        `No tuition found for student with sID: ${sID}`,
      );
    }

    return tuition;
  }

  async updateTuition(
    id: number,
    status?: string,
    fee?: number,
    startTime?: Date,
    endTime?: Date,
  ) {
    const tuition = await this.prisma.tuition.findUnique({
      where: { id },
    });

    if (!tuition) {
      throw new NotFoundException(`Tuition with id ${id} not found`);
    }

    return this.prisma.tuition.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(fee !== undefined && { fee }),
      },
      include: {
        student: {
          select: {
            id: true,
            sID: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            dateOfBirth: true,
          },
        },
      },
    });
  }
}
