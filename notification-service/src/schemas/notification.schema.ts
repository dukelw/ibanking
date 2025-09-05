import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop()
  message: string;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  userId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
