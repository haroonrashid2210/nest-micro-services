import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto';

@Injectable()
export class NotificationsService {
  async notifyEmail(data: NotifyEmailDto) {
    console.log(data.email, 'sent notification');
  }
}
