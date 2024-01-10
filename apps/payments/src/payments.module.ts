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
        transport: Transport.TCP,
        options: { host: CONSTANT.HOST.NOTIFICATIONS, port: Number(ENV.PORT.NOTIFICATION) },
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
