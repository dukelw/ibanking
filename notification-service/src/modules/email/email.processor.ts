import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { EmailService } from './email.service';

@Processor('notification')
export class EmailProcessor {
  constructor(private emailService: EmailService) {}

  @Process('sendPaymentEmail')
  async handleSendPaymentEmail(job: Job) {
    const { to, subject, body } = job.data;
    await this.emailService.sendMail(to, subject, body);
    console.log(`✅ Email sent to ${to}`);
  }
}
