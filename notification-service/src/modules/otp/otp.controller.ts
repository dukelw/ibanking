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
        userId: { type: 'string', example: 'user-123' },
        email: { type: 'string', example: 'student@example.com' },
        transactionId: { type: 'string', nullable: true, example: 'txn-456' },
      },
      required: ['userId', 'email'],
    },
  })
  @ApiResponse({ status: 201, description: 'OTP generated and sent to email' })
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
        userId: { type: 'string', example: 'user-123' },
        code: { type: 'string', example: '123456' },
      },
      required: ['userId', 'code'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OTP verification result',
    schema: {
      type: 'object',
      properties: { valid: { type: 'boolean', example: true } },
    },
  })
  async verify(@Body() dto: { userId: string; code: string }) {
    const isValid = await this.otpService.verifyOtp(dto.userId, dto.code);
    return { valid: isValid };
  }
}
