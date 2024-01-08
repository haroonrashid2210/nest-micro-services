import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ENV } from '@app/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: ENV.PORT.PAYMENT,
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
