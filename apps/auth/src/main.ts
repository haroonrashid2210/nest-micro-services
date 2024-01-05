import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { ENV } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({ transport: Transport.TCP, options: { host: '0.0.0.0', port: ENV.PORT.TCP } });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(ENV.PORT.AUTH);
}
bootstrap();
