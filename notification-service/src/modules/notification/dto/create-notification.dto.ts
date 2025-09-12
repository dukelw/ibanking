import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: 'New Message',
    description: 'Title of the notification',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'You have a new message in your inbox',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  message?: string;

  @ApiProperty({
    example: 'user-123',
    required: false,
    description: 'Optional user ID linked to this notification',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
