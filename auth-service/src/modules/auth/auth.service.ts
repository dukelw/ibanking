import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
