import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiProperty, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { StudentService } from './student.service';

// ================= DTOs =================
class CreateStudentDto {
  @ApiProperty({ example: 'student_12345', description: 'Student ID' })
  sID: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  password: string;

  @ApiProperty({ example: 'Student', description: 'Full name' })
  name: string;

  @ApiProperty({ example: 'student@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '0123456789', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'City', required: false })
  address?: string;

  @ApiProperty({
    example: '2000-01-01T00:00:00.000Z',
    required: false,
    description: 'Date of birth in ISO 8601 format',
  })
  dateOfBirth?: string;
}

class LoginStudentDto {
  @ApiProperty({ example: 'student_12345' })
  sID: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

// =======================================
// ========== Response DTOs ==========
class StudentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'student_12345' })
  sID: string;

  @ApiProperty({ example: 'Student' })
  name: string;

  @ApiProperty({ example: 'student@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '0123456789', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'City', required: false })
  address?: string;

  @ApiProperty({
    example: '2000-01-01T00:00:00.000Z',
    required: false,
    description: 'Date of birth (ISO 8601)',
  })
  dateOfBirth?: Date;
}

class LoginResponseDto {
  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({ type: () => StudentResponseDto })
  student: StudentResponseDto;
}

// =======================================
@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully', type: StudentResponseDto })
  @ApiResponse({
    status: 500,
    description: 'Invalid input data',
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
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'List of students', type: [StudentResponseDto] })
  @ApiResponse({
    status: 404,
    description: 'No students found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No students found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async getStudents() {
    return this.studentService.getStudents();
  }

  @Get(':sID')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiResponse({ status: 200, description: 'Student found', type: StudentResponseDto })
  @ApiResponse({
    status: 404,
    description: 'Student not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Student not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async getStudentById(@Param('sID') sID: string) {
    return this.studentService.getStudentById(sID);
  }

  @Post('login')
  @ApiOperation({ summary: 'Student login' })
  @ApiResponse({ status: 200, description: 'Login success', type: LoginResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  async login(@Body() dto: LoginStudentDto) {
    return this.studentService.login(dto.sID, dto.password);
  }
}
