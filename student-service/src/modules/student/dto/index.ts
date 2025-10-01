import { ApiProperty } from '@nestjs/swagger';

// ========== Request DTOs ==========
export class PayTuitionDto {
  @ApiProperty({ example: 101, description: 'Tuition fee ID' })
  tuitionId: number;

  @ApiProperty({ example: 'STUDENT', description: 'Payer account type' })
  payerType: string;

  @ApiProperty({ example: 'student@example.com', description: 'Payer email' })
  payerEmail: string;

  @ApiProperty({ example: 202, description: 'Payer ID (e.g., student ID)' })
  payerId: number;

  @ApiProperty({
    example: 'checkout-456',
    description: 'Checkout ID for the payment session',
  })
  checkoutId: string;
}

export class CreateStudentDto {
  @ApiProperty({ example: 'S12345', description: 'Student unique ID' })
  sID: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  name: string;

  @ApiProperty({ example: 'student@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '0123456789', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'New York', required: false })
  address?: string;

  @ApiProperty({
    example: '2002-01-01',
    required: false,
    description: 'Date of birth (ISO 8601)',
  })
  dateOfBirth?: string;
}

export class LoginStudentDto {
  @ApiProperty({ example: 'S12345' })
  sID: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

// ========== Response DTOs ==========
export class PayTuitionResponseDto {
  @ApiProperty({ example: 'Payment successful' })
  message: string;

  @ApiProperty({ example: 101 })
  tuitionId: number;

  @ApiProperty({ example: 'PAID' })
  tuitionStatus: string;
}
export class StudentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'S12345' })
  sID: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'student@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '0123456789', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'New York', required: false })
  address?: string;

  @ApiProperty({
    example: '2002-10-10T00:00:00.000Z',
    required: false,
    description: 'Date of birth (ISO 8601)',
  })
  dateOfBirth?: Date;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({ type: () => StudentResponseDto })
  student: StudentResponseDto;
}
