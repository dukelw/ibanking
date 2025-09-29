import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { CreateUserDto, LoginDto, DeductBalanceDto, UserResponseDto, LoginResponseDto, UserIDResponseDto, BalanceDeductResponseDto } from './dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register user',
    description: 'Create a new user account',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'User failed to be created',
  })
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name?: string,
    @Body('phone') phone?: string,
    @Body('balance') balance?: number,
  ) {
    return this.authService.createUser(email, password, name, phone, balance);
  }

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'User login with email and password',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        message: 'Email or password is incorrect',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }

  @Get('users')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Return all users in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to fetch users',
  })
  async findAll() {
    return this.authService.getUsers();
  }

  @Post(':id/deduct-balance')
  @ApiOperation({
    summary: 'Deduct user balance',
    description: 'Subtract a certain amount from the user balance',
  })
  @ApiBody({ type: DeductBalanceDto })
  @ApiResponse({
    status: 200,
    description: 'Balance deducted successfully',
    type: BalanceDeductResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Not enough balance',
  })
  async deductBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() deductBalanceDto: DeductBalanceDto,
  ) {
    return await this.authService.deductBalance(id, deductBalanceDto.amount);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Return user details by ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'User ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
    type: UserIDResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserById(id);
  }
}
