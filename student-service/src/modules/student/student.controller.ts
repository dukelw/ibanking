import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { StudentService } from './student.service';

// ================= DTOs =================
class CreateStudentDto {
  @ApiProperty({ example: '12345', description: 'Student ID' })
  sID: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  password: string;

  @ApiProperty({ example: 'Nguyen Van A', description: 'Full name' })
  name: string;

  @ApiProperty({ example: 'abc@gmail.com', required: false })
  email?: string;

  @ApiProperty({ example: '0123456789', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'Hanoi', required: false })
  address?: string;

  @ApiProperty({
    example: '2025-01-01',
    required: false,
    description: 'Date of birth in ISO 8601 format',
  })
  dateOfBirth?: string;
}

class LoginStudentDto {
  @ApiProperty({ example: '52200195' })
  sID: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
// =======================================
// ========== Response DTO ==========
class StudentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '12345' })
  sID: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  name: string;

  @ApiProperty({ example: 'abc@gmail.com', required: false })
  email?: string;

  @ApiProperty({ example: '0123456789', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'Hanoi', required: false })
  address?: string;

  @ApiProperty({
    example: '2002-10-10T00:00:00.000Z',
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
  @ApiResponse({ status: 200, description: 'Student created successfully', type: StudentResponseDto })
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
  @ApiResponse({ status: 200, description: 'List of students', type: [StudentResponseDto] })
  async getStudents() {
    return this.studentService.getStudents();
  }

  @Get(':sID')
  @ApiResponse({ status: 200, description: 'Student found', type: StudentResponseDto })
  async getStudentById(@Param('sID') sID: string) {
    return this.studentService.getStudentById(sID);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login success', type: LoginResponseDto })
  async login(@Body() dto: LoginStudentDto) {
    return this.studentService.login(dto.sID, dto.password);
  }
}
