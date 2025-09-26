import { ApiProperty } from '@nestjs/swagger';

export class StudentInfoDto {
  @ApiProperty({ example: 1, description: 'Student database ID' })
  id: number;

  @ApiProperty({ example: '52200195', description: 'Student code (sID)' })
  sID: string;

  @ApiProperty({
    example: 'Nguyen Quang Vinh',
    description: 'Full name of student',
  })
  name: string;
}

export class TransactionResponseDto {
  @ApiProperty({ example: 101, description: 'Transaction ID' })
  id: number;

  @ApiProperty({ example: 5000000, description: 'Transaction amount' })
  amount: number;

  @ApiProperty({
    example: '2025-09-26T12:30:00.000Z',
    description: 'Transaction creation time',
  })
  createdAt: Date;

  @ApiProperty({
    example: 42,
    description: 'ID of the user who made the payment',
  })
  paymentUserId: number;

  @ApiProperty({
    example: 'STUDENT',
    description: 'Type of account used for payment',
  })
  paymentAccountType: string;

  @ApiProperty({ type: () => StudentInfoDto })
  student: StudentInfoDto;
}
