import { ApiProperty } from '@nestjs/swagger';

export class GenerateOtpDto {
  @ApiProperty({ description: 'User ID in the system', example: 'user_12345' })
  userId: string;

  @ApiProperty({ description: 'User email to send OTP', example: 'student@example.com' })
  email: string;

  @ApiProperty({ description: 'Transaction ID (optional)', example: 'txn-456', required: false })
  transactionId?: string;
}
export class GenerateOtpResponseDto {
  @ApiProperty({ example: '76f3f4ca-73b1-4113-9e3f-76dc33d26f7a' })
  id: string;

  @ApiProperty({ example: '981410' })
  code: string;

  @ApiProperty({ example: 'user_12345' })
  userId: string;

  @ApiProperty({ example: 'txn-456', required: false })
  transactionId?: string;

  @ApiProperty({ example: '2025-09-19T14:15:56.312Z' })
  expiresAt: string;

  @ApiProperty({ example: false })
  used: boolean;

  @ApiProperty({ example: '2025-09-19T14:10:56.315Z' })
  createdAt: string;
}
export class VerifyOtpDto {
  @ApiProperty({ description: 'User ID in the system', example: 'user_12345' })
  userId: string;

  @ApiProperty({ description: 'OTP code entered by the user', example: '123456' })
  code: string;
}
export class VerifyOtpResponseDto {
  @ApiProperty({ example: true })
  valid: boolean;
}