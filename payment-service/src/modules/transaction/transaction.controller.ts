import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() body: { amount: number; status: string }) {
    return this.transactionService.create(body.amount, body.status);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }
}
