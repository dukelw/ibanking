import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  LoginStudentDto,
  PayTuitionDto,
  PayTuitionResponseDto,
  StudentResponseDto,
  LoginResponseDto,
} from './dto';
import { PaymentAccountType } from 'prisma/generated/prisma';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create student',
    description:
      'Register a new student with basic information such as ID, password, name, and optional details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Student created successfully',
    type: StudentResponseDto,
  })
  async createStudent(@Body() dto: CreateStudentDto) {
    return this.studentService.createStudent(
      dto.sID,
      dto.password,
      dto.name,
      dto.email,
      dto.phoneNumber,
      dto.address,
      dto.dateOfBirth,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all students',
    description: 'Retrieve a list of all registered students.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of students',
    type: [StudentResponseDto],
  })
  async getStudents() {
    return this.studentService.getStudents();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get student by ID',
    description: 'Fetch details of a specific student using their ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Student found',
    type: StudentResponseDto,
  })
  async getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getStudentById(id);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Student login',
    description: 'Authenticate a student using their Student ID and password.',
  })
  @ApiResponse({
    status: 201,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  async login(@Body() dto: LoginStudentDto) {
    return this.studentService.login(dto.sID, dto.password);
  }

  @Post(':sID/pay-tuition')
  @ApiOperation({
    summary: 'Pay tuition',
    description:
      'Process tuition fee payment for a student. Requires tuition ID, payer ID, and account type.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tuition paid successfully',
    type: PayTuitionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tuition or student not found',
  })
  async payTuition(@Param('sID') sID: string, @Body() dto: PayTuitionDto) {
    return this.studentService.payTuition(
      dto.payerEmail,
      sID,
      dto.tuitionId,
      dto.payerId,
      dto.payerType as PaymentAccountType,
    );
  }
}
