import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from 'src/schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(title: string, message: string, userId?: string) {
    const notif = new this.notificationModel({ title, message, userId });
    return notif.save();
  }

  async findAll(userId?: string) {
    if (userId) return this.notificationModel.find({ userId }).exec();
    return this.notificationModel.find().exec();
  }

  async markAsRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(
      id,
      { read: true },
      { new: true },
    );
  }
}
