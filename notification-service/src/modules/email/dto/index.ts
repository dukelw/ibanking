import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'user@example.com',
  })
  to: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Welcome to our service',
  })
  subject: string;

  @ApiProperty({
    description: 'Email content (HTML or plain text)',
    example: '<p>Hello, your account has been created!</p>',
  })
  body: string;

  @ApiProperty({
    description: 'Sender ID in the system (optional)',
    example: 'user_12345',
    required: false,
  })
  userId?: string;
}
