import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  
  @Post('register')
  async studentcreate(
    @Body('id') id: number,
    @Body('name') name?: string,
  ) {
    return this.studentService.createStudent(id, name);
  }
  @Get()
  async findAll() {
    return this.studentService.getStudents();
  }
}
