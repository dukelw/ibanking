import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { EmailService } from './email.service';

class SendEmailDto {
  @ApiProperty({
    description: 'Người nhận email',
    example: 'user@example.com',
  })
  to: string;

  @ApiProperty({
    description: 'Tiêu đề email',
    example: 'Welcome to our service',
  })
  subject: string;

  @ApiProperty({
    description: 'Nội dung email (HTML hoặc plain text)',
    example: '<p>Hello, your account has been created!</p>',
  })
  body: string;

  @ApiProperty({
    description: 'ID người gửi trong hệ thống (tùy chọn)',
    example: 'user_12345',
    required: false,
  })
  userId?: string;
}

@Controller('email')
@ApiTags('Email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an email' })
  @ApiBody({ type: SendEmailDto })
  @ApiResponse({
    status: 201,
    description: 'Email queued/sent successfully',
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
