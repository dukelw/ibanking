import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async generateOtp(userId: string, email: string, checkoutId: string) {
    let code: string;
    let existing: any;

    do {
      code = String(randomInt(100000, 999999));
      existing = await this.prisma.otp.findFirst({
        where: {
          userId,
          checkoutId,
          code,
          expiresAt: { gt: new Date() },
          used: false,
        },
      });
    } while (existing);

    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    const otp = await this.prisma.otp.create({
      data: { code, userId, expiresAt, checkoutId },
    });

    const subject = 'Your OTP Code';
    const body = `<p>Your OTP code is <b>${code}</b>. It will expire in 1 minutes.</p>`;

    await this.emailService.sendMail(email, subject, body, userId);

    return otp;
  }

  async verifyOtp(userId: string, code: string, checkoutId: string) {
    const otp = await this.prisma.otp.findFirst({
      where: {
        userId,
        code,
        used: false,
        expiresAt: { gt: new Date() },
        checkoutId,
      },
    });

    if (!otp)
      return {
        message: 'Invalid or expired OTP',
        success: false,
      };

    await this.prisma.otp.update({
      where: { id: otp.id },
      data: { used: true },
    });

    return { message: 'OTP verified successfully', success: true };
  }
}
