import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CONSTANT, ENV, LoggerModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule,
    ClientsModule.register([
      {
        name: CONSTANT.SERVICE.NOTIFICATIONS,
        transport: Transport.RMQ,
        options: { urls: [ENV.RABBITMQ_URI], queue: 'notifications' },
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
