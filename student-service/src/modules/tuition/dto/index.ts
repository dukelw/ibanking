import { ApiProperty } from '@nestjs/swagger';

export class CreateTuitionDto {
  @ApiProperty({ description: 'Student ID', example: 'SV001' })
  sID: string;

  @ApiProperty({ description: 'Tuition fee', example: 5000000 })
  fee: number;

  @ApiProperty({
    description: 'Payment status',
    example: 'PENDING',
    required: false,
    default: 'PENDING',
  })
  status?: string;

  @ApiProperty({
    description: 'Start time of the tuition period',
    example: '2025-09-01T00:00:00.000Z',
    required: false,
  })
  startTime?: Date;

  @ApiProperty({
    description: 'End time of the tuition period',
    example: '2026-05-31T23:59:59.000Z',
    required: false,
  })
  endTime?: Date;
}
export class UpdateTuitionDto {
  @ApiProperty({
    description: 'Payment status (e.g. PENDING, DONE, CANCELLED)',
    example: 'DONE',
    required: false,
  })
  status?: string;

  @ApiProperty({
    description: 'Updated tuition fee',
    example: 6000000,
    required: false,
  })
  fee?: number;
}
export class StudentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '52200195' })
  sID: string;

  @ApiProperty({ example: 'Nguyen Quang Vinh' })
  name: string;

  @ApiProperty({ example: 'abc@gmail.com' })
  email: string;

  @ApiProperty({ example: '0123456789' })
  phoneNumber: string;

  @ApiProperty({ example: 'Hanoi' })
  address: string;

  @ApiProperty({ example: '2022-01-22T00:00:00.000Z' })
  dateOfBirth: Date;
}

export class TuitionWithStudentResponseDto {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: '52200195' })
  sID: string;

  @ApiProperty({ example: 'PENDING' })
  status: string;

  @ApiProperty({ example: 5000000 })
  fee: number;

  @ApiProperty({ example: '2025-09-01T00:00:00.000Z' })
  startTime: Date;

  @ApiProperty({ example: '2026-05-31T23:59:59.000Z' })
  endTime: Date;

  @ApiProperty({ type: () => StudentResponseDto })
  student: StudentResponseDto;
}
