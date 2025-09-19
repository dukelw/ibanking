import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendMail(to: string, subject: string, body: string, userId?: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: body,
      });

      return this.prisma.emailSent.create({
        data: { to, subject, body, userId, status: 'SENT' },
      });
    } catch (err) {
      return this.prisma.emailSent.create({
        data: { to, subject, body, userId, status: 'FAILED' },
      });
    }
  }
}
