import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Transport } from '@nestjs/microservices';
import { ENV } from '@app/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  app.connectMicroservice({ transport: Transport.RMQ, options: { urls: [ENV.RABBITMQ_URI], queue: 'notifications' } });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
