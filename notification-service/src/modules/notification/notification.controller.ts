import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(
    @Body() body: { title: string; message: string; userId?: string },
  ) {
    return this.notificationService.create(
      body.title,
      body.message,
      body.userId,
    );
  }

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.notificationService.findAll(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }
}
