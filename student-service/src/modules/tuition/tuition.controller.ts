import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { TuitionService } from './tuition.service';

// ================= DTO =================
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

class CreateTuitionDto {
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

class UpdateTuitionDto {
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
// =============== Controller ===============
@Controller('tuition')
@ApiTags('Tuition')
export class TuitionController {
  constructor(private readonly tuitionService: TuitionService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new tuition record' })
  @ApiBody({ type: CreateTuitionDto })
  @ApiResponse({ status: 201, description: 'Tuition created successfully', type: TuitionWithStudentResponseDto })
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
  @ApiOperation({ summary: 'Get all tuition records' })
  @ApiResponse({ status: 200, description: 'List of tuitions', type: [TuitionWithStudentResponseDto] })
  async findAll() {
    return this.tuitionService.getTuitions();
  }

  @Get(':sID')
  @ApiOperation({ summary: 'Get tuition by student ID' })
  @ApiResponse({ status: 200, description: 'Tuition records of student', type: [TuitionWithStudentResponseDto] })
  @ApiResponse({ status: 404, description: 'No tuition found' })
  async getTuitionByStudentId(@Param('sID') sID: string) {
    return this.tuitionService.getTuitionByStudentId(sID);
  }
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update tuition (by tuition id)' })
  @ApiBody({ type: UpdateTuitionDto })
  @ApiResponse({ status: 200, description: 'Tuition updated successfully', type: TuitionWithStudentResponseDto })
  @ApiResponse({ status: 404, description: 'Tuition not found' })
  async updateTuition(@Param('id') id: string, @Body() dto: UpdateTuitionDto) {
    return this.tuitionService.updateTuition(Number(id), dto.status, dto.fee);
  }
}
