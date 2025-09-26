import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { TuitionService } from './tuition.service';
import {
  CreateTuitionDto,
  UpdateTuitionDto,
  TuitionWithStudentResponseDto,
} from './dto';

@Controller('tuition')
@ApiTags('Tuition')
export class TuitionController {
  constructor(private readonly tuitionService: TuitionService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create new tuition record',
    description:
      'This endpoint allows creating a new tuition record for a student. ',
  })
  @ApiBody({ type: CreateTuitionDto })
  @ApiResponse({
    status: 201,
    description: 'Tuition created successfully',
    type: TuitionWithStudentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async createTuition(@Body() dto: CreateTuitionDto) {
    return this.tuitionService.createTuition(
      dto.sID,
      dto.fee,
      dto.status,
      dto.startTime,
      dto.endTime,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tuition records',
    description: 'Retrieve a list of all tuition records in the system. ',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by tuition status (e.g. PENDING, PAID, CANCELLED)',
    type: String,
    example: 'PENDING',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tuition records',
    type: [TuitionWithStudentResponseDto],
  })
  async findAll(@Query('status') status?: string) {
    return this.tuitionService.getTuitions(status);
  }

  @Get(':sID')
  @ApiOperation({
    summary: 'Get tuition by student ID',
    description:
      'Retrieve all tuition records of a specific student using their student ID.',
  })
  @ApiParam({
    name: 'sID',
    type: String,
    description: 'Student ID',
    example: 'SV001',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by tuition status (e.g. PENDING, PAID, CANCELLED)',
    type: String,
    example: 'PENDING',
  })
  @ApiResponse({
    status: 200,
    description: 'Tuition records of the student',
    type: [TuitionWithStudentResponseDto],
  })
  @ApiResponse({ status: 404, description: 'No tuition found' })
  async getTuitionByStudentId(
    @Param('sID') sID: string,
    @Query('status') status?: string,
  ) {
    return this.tuitionService.getTuitionByStudentId(sID, status);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Update tuition (by tuition ID)',
    description: 'Update a tuition record using its tuition ID.',
  })
  @ApiBody({ type: UpdateTuitionDto })
  @ApiResponse({
    status: 200,
    description: 'Tuition updated successfully',
    type: TuitionWithStudentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tuition not found' })
  async updateTuition(@Param('id') id: string, @Body() dto: UpdateTuitionDto) {
    return this.tuitionService.updateTuition(Number(id), dto.status, dto.fee);
  }
}
