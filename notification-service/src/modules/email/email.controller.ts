import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto';

@Controller('email')
@ApiTags('Email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  @ApiOperation({
    summary: 'Send an email',
    description: 'Queue or send an email',
  })
  @ApiBody({ type: SendEmailDto })
  @ApiResponse({
    status: 201,
    description: 'Email queued/sent successfully',
    schema: {
      example: {
        id: 'a398fdd5-b62e-42ca-a4be-a45655aa53b8',
        to: 'user@example.com',
        subject: 'Welcome to our service',
        body: '<p>Hello, your account has been created!</p>',
        userId: 'user_12345',
        status: 'SENT',
        createdAt: '2025-09-19T14:09:07.124Z',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to send email',
  })
  async send(@Body() dto: SendEmailDto) {
    return this.emailService.sendMail(
      dto.to,
      dto.subject,
      dto.body,
      dto.userId,
    );
  }
}
