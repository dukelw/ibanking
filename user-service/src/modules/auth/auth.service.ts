import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    name?: string,
    phone?: string,
    balance?: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        name,
        phone,
        balance,
        password: hashedPassword,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        balance: true,
        createdAt: true,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const { password: _, ...safeUser } = user;

    return {
      message: 'Login successful',
      user: safeUser,
    };
  }

  async deductBalance(id: number, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    if (user.balance < amount)
      throw new BadRequestException('Not enough balance');

    const updatedUser = await this.prisma.user.update({
      where: { id, balance: { gte: amount } },
      data: { balance: { decrement: amount } },
    });

    return {
      message: 'Balance deducted',
      newBalance: updatedUser.balance,
    };
  }

  async refundBalance(id: number, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { balance: { increment: amount } },
    });

    return {
      message: 'Balance refunded',
      newBalance: updatedUser.balance,
    };
  }

  async getUserById(id: number) {
    const student = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        balance: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }
}
