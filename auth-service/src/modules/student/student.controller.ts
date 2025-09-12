import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  
  @Post('register')
  async studentcreate(
    @Body('sID') sID: string,
    @Body('password') password: string,
    @Body('name') name?: string,
  ) {
    return this.studentService.createStudent(sID, password, name);
  }

  @Post('login')
  async login(
    @Body('sID') sID: string,
    @Body('password') password: string,
  ) {
    return this.studentService.login(sID, password);
  }
  
  @Get()
  async findAll() {
    return this.studentService.getStudents();
  }
}
