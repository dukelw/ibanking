import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { TransactionResponseDto } from './dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all transactions',
    description:
      'Retrieve a list of all transactions, including related student info.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all transactions',
    type: [TransactionResponseDto],
  })
  async getAllTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get transaction details',
    description:
      'Retrieve details of a specific transaction by its transaction ID.',
  })
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
  @ApiOperation({
    summary: 'Get transactions of a user',
    description:
      'Retrieve all transactions made by a specific user, based on payer type and user ID.',
  })
  @ApiParam({
    name: 'payerType',
    type: String,
    description: 'Payer type (e.g., STUDENT, STAFF)',
  })
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
