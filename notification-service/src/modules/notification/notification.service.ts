import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, message?: string, userId?: string) {
    return this.prisma.notification.create({
      data: { title, message, userId },
    });
  }

  async findAll(userId?: string) {
    if (userId) {
      return this.prisma.notification.findMany({ where: { userId } });
    }
    return this.prisma.notification.findMany();
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async update(
    id: string,
    data: { title?: string; message?: string; read?: boolean },
  ) {
    return this.prisma.notification.update({
      where: { id },
      data,
    });
  }
}
