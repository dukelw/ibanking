import { ApiProperty } from '@nestjs/swagger';
import { PaymentAccountType } from 'prisma/generated/prisma/wasm';

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
}

export class CreateTransactionDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  tuitionId: number;

  @ApiProperty()
  checkoutId: string;

  @ApiProperty()
  paymentUserId: number;

  @ApiProperty({ enum: PaymentAccountType })
  paymentAccountType: PaymentAccountType;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  payerEmail: string;
}
