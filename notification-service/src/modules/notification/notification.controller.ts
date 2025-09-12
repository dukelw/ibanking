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
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto.title, dto.message, dto.userId);
  }

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.notificationService.findAll(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  // optional: update title/message/read
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.notificationService.update(id, dto);
  }
}
