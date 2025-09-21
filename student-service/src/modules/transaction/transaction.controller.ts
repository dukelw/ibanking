import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';

// ================= DTOs cho Swagger =================
class StudentInfoDto {
  id: number;
  sID: string;
  name: string;
}

class TransactionResponseDto {
  id: number;
  amount: number;
  createdAt: Date;
  paymentUserId: number;
  paymentAccountType: string;
  student: StudentInfoDto;
}

// ====================================================

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'List of all transactions',
    type: [TransactionResponseDto],
  })
  async getAllTransactions() {
    console.log('Hello');
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction details',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getTransactionById(id);
  }

  @Get('user/:payerType/:id')
  @ApiParam({ name: 'payerType', type: String, description: 'Payer type' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Transactions of a specific user',
    type: [TransactionResponseDto],
  })
  async getTransactionOfUser(
    @Param('payerType') payerType: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.transactionService.getTransactionOfUser(payerType, id);
  }
}
