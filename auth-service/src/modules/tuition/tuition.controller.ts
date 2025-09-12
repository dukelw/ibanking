import { Body, Controller, Get, Post } from '@nestjs/common';
import { TuitionService } from './tuition.service';

@Controller('tuition')
export class TuitionController {
  constructor(private readonly tuitionService: TuitionService) {}

  @Post('create')
  async createTuition(
    @Body('status') status: string,
    @Body('fee') fee: number,
  ) {
    return this.tuitionService.createTuition(status, fee);
  }
  @Get()
  async findAll() {
    return this.tuitionService.getTuitions();
  }
}
