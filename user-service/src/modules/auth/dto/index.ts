import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'student@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Nguyen Van A', required: false })
  name?: string;

  @ApiProperty({ example: 'secret123' })
  password: string;

  @ApiProperty({ example: '0123456789', default: '' })
  phone?: string;

  @ApiProperty({ example: 1000.5, default: 0.0 })
  balance?: number;
}

export class LoginDto {
  @ApiProperty({ example: 'student@gmail.com' })
  email: string;

  @ApiProperty({ example: 'secret123' })
  password: string;
}

export class DeductBalanceDto {
  @ApiProperty({ example: 100 })
  amount: number;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'student@example.com' })
  email: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  name: string;

  @ApiProperty({ example: '0123456789' })
  phone: string;

  @ApiProperty({ example: 1000.5 })
  balance: number;

  @ApiProperty({ example: '2025-09-19T13:55:55.006Z' })
  createdAt: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}

export class UserIDResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'student@example.com' })
  email: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  name: string;

  @ApiProperty({ example: '0123456789' })
  phone: string;

  @ApiProperty({ example: 1000.5 })
  balance: number;
}
export class BalanceDeductResponseDto {
  @ApiProperty({ example: 'Balance deducted' })
  message: string;

  @ApiProperty({ example: 1000.5 })
  newBalance: number;
}
