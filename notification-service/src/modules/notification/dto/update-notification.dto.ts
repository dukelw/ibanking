import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({ example: 'false', required: false })
  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @ApiProperty({ example: 'Updated Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated message content', required: false })
  @IsOptional()
  @IsString()
  message?: string;
}
