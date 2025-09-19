import { Body, Controller, Get, Post } from '@nestjs/common';
import { TuitionService } from './tuition.service';

@Controller('tuition')
export class TuitionController {
  constructor(private readonly tuitionService: TuitionService) {}

  @Post('create')
  async createTuition(
    @Body('sID') sID: string,
    @Body('status') status: string,
    @Body('fee') fee: number,
  ) {
    return this.tuitionService.createTuition(sID, status, fee);
  }
  @Get()
  async findAll() {
    return this.tuitionService.getTuitions();
  }
}
