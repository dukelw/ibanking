import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('OTP') // nhóm OTP trong Swagger
@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Generate OTP',
    description: 'Tạo OTP mới và gửi qua email cho user',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user_12345' },
        email: { type: 'string', example: 'student@example.com' },
        transactionId: { type: 'string', nullable: true, example: 'txn-456' },
      },
      required: ['userId', 'email'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'OTP generated and sent to email',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '76f3f4ca-73b1-4113-9e3f-76dc33d26f7a' },
        code: { type: 'string', example: '981410' },
        userId: { type: 'string', example: 'user_12345' },
        transactionId: { type: 'string', example: 'txn-456' },
        expiresAt: { type: 'string', example: '2025-09-19T14:15:56.312Z' },
        used: { type: 'boolean', example: false },
        createdAt: { type: 'string', example: '2025-09-19T14:10:56.315Z' },
      },
      example: {
        id: '76f3f4ca-73b1-4113-9e3f-76dc33d26f7a',
        code: '981410',
        userId: 'user_12345',
        transactionId: 'txn-456',
        expiresAt: '2025-09-19T14:15:56.312Z',
        used: false,
        createdAt: '2025-09-19T14:10:56.315Z',
      },
    },
  })
  async generate(
    @Body() dto: { userId: string; email: string; transactionId?: string },
  ) {
    return this.otpService.generateOtp(
      dto.userId,
      dto.email,
      dto.transactionId,
    );
  }

  @Post('verify')
  @ApiOperation({
    summary: 'Verify OTP',
    description: 'Xác thực OTP người dùng nhập',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user_12345' },
        code: { type: 'string', example: '123456' },
      },
      required: ['userId', 'code'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OTP verification result (true/false)',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean', example: true },
      },
      examples: {
        success: {
          value: { valid: true },
        },
        failure: {
          value: { valid: false },
        },
      },
    },
  })
  async verify(@Body() dto: { userId: string; code: string }) {
    const isValid = await this.otpService.verifyOtp(dto.userId, dto.code);
    return { valid: isValid };
  }
}
