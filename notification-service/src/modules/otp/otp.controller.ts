import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  GenerateOtpDto,
  GenerateOtpResponseDto,
  VerifyOtpDto,
  VerifyOtpResponseDto,
} from './dto';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Generate OTP',
    description: 'Create a new OTP and send it via email',
  })
  @ApiBody({ type: GenerateOtpDto })
  @ApiResponse({
    status: 201,
    description: 'OTP generated and sent to email',
    type: GenerateOtpResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Failed to generate or send OTP' })
  async generate(@Body() dto: GenerateOtpDto) {
    return this.otpService.generateOtp(dto.userId, dto.email, dto.checkoutId);
  }

  @Post('verify')
  @ApiOperation({
    summary: 'Verify OTP',
    description: 'Verify the OTP entered by the user',
  })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: 201,
    description: 'OTP verification result',
    type: VerifyOtpResponseDto,
  })
  async verify(@Body() dto: VerifyOtpDto) {
    const response = await this.otpService.verifyOtp(
      dto.userId,
      dto.code,
      dto.checkoutId,
    );
    return response;
  }
}
