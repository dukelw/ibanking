import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('AUTH') // nhóm AUTH trong Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Đăng ký user',
    description: 'Tạo tài khoản user mới',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'student@example.com' },
        name: { type: 'string', example: 'Nguyen Van A', nullable: true },
        password: { type: 'string', example: 'secret123' },
        phone: { type: 'string', example: '0123456789', default: '' },
        balance: { type: 'number', example: 1000.5, default: 0.0 },
      },
      required: ['email', 'password'], 
    },
  })

  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        id: 11,
        email: 'student@example.com',
        name: 'Nguyen Van A',
        password: '$2b$10$hash-password',
        phone: '0123456789',
        balance: 1000.5,
        createdAt: '2025-09-19T13:55:55.006Z',
      },
    },
  })

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'student@example.com' },
        name: { type: 'string', example: 'Nguyen Van A' },
        password: { type: 'string', example: 'secret123' },
        phone: { type: 'string', example: '0123456789' },
        balance: { type: 'number', example: 1000.5 },
      },
      required: ['email', 'password'],
    },
  })
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name?: string,
  ) {
    return this.authService.createUser(email, password, name);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập user',
    description: 'Người dùng đăng nhập bằng email và mật khẩu',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'student@example.com' },
        password: { type: 'string', example: 'secret123' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully',
    schema: {
      example: {
        message: 'Login successful',
        user: {
          id: 11,
          email: 'student@example.com',
          name: 'Nguyen Van A',
          phone: '0123456789',
          balance: 1000.5,
          createdAt: '2025-09-19T13:55:55.006Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Get('users')
  @ApiOperation({ summary: 'Lấy danh sách user', description: 'Trả về toàn bộ user trong hệ thống' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách user trả về thành công',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          email: { type: 'string', example: 'student@example.com' },
          name: { type: 'string', example: 'Nguyen Van A' },
          phone: { type: 'string', example: '0123456789' },
          balance: { type: 'number', example: 1000.5 },
          createdAt: { type: 'string', example: '2025-09-19T13:55:55.006Z' },
        },
      },
      example: [
        {
          id: 1,
          email: 'student@example.com',
          name: 'Nguyen Van A',
          phone: '0123456789',
          balance: 1000.5,
          createdAt: '2025-09-19T13:55:55.006Z',
        },
        {
          id: 2,
          email: 'puahuhu@example.com',
          name: 'Nguyen Van B',
          phone: '',
          balance: 0.0,
          createdAt: '2025-09-19T14:00:00.006Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve users',
  })
  async findAll() {
    return this.authService.getUsers();
  }
}
