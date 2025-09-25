import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiProperty } from '@nestjs/swagger';

// ================= DTOs =================
class GenerateOtpDto {
  @ApiProperty({ description: 'User ID', example: 'user_12345' })
  userId: string;

  @ApiProperty({ description: 'Recipient email address', example: 'student@example.com' })
  email: string;

  @ApiProperty({ description: 'Associated transaction ID (optional)', example: 'txn-456', required: false })
  transactionId?: string;
}

class OtpResponseDto {
  @ApiProperty({ description: 'OTP record ID', example: '76f3f4ca-73b1-4113-9e3f-76dc33d26f7a' })
  id: string;

  @ApiProperty({ description: 'Generated OTP code', example: '981410' })
  code: string;

  @ApiProperty({ description: 'User ID', example: 'user_12345' })
  userId: string;

  @ApiProperty({ description: 'Associated transaction ID', example: 'txn-456', required: false })
  transactionId?: string;

  @ApiProperty({ description: 'Expiration timestamp of the OTP', example: '2025-09-19T14:15:56.312Z' })
  expiresAt: string;

  @ApiProperty({ description: 'Whether the OTP has been used', example: false })
  used: boolean;

  @ApiProperty({ description: 'Creation timestamp of the OTP record', example: '2025-09-19T14:10:56.315Z' })
  createdAt: string;
}

class VerifyOtpDto {
  @ApiProperty({ description: 'User ID', example: 'user_12345' })
  userId: string;

  @ApiProperty({ description: 'OTP code to verify', example: '123456' })
  code: string;
}

class VerifyOtpResponseDto {
  @ApiProperty({ description: 'Whether the OTP is valid', example: true })
  valid: boolean;
}

// =======================================

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate OTP', description: 'Generate a new OTP and send it via email to the user' })
  @ApiBody({ type: GenerateOtpDto })
  @ApiResponse({ status: 201, description: 'OTP generated and sent successfully', type: OtpResponseDto })
  @ApiResponse({ status: 500, description: 'Failed to generate/send OTP' })
  async generate(@Body() dto: GenerateOtpDto) {
    return this.otpService.generateOtp(dto.userId, dto.email, dto.transactionId);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify OTP', description: 'Verify the OTP code entered by the user' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP verification result', type: VerifyOtpResponseDto })
  @ApiResponse({
    status: 201,
    description: 'Invalid OTP or verification failed',
    schema: {
      example: { valid: false },
    },
  })
  async verify(@Body() dto: VerifyOtpDto) {
    const isValid = await this.otpService.verifyOtp(dto.userId, dto.code);
    return { valid: isValid };
  }
}
