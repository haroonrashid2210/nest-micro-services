import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { CONSTANT, DatabaseModule, ENV, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema }]),
    ClientsModule.register([
      {
        name: CONSTANT.SERVICE.AUTH,
        transport: Transport.RMQ,
        options: { urls: [ENV.RABBITMQ_URI], queue: 'auth' },
      },
      {
        name: CONSTANT.SERVICE.PAYMENTS,
        transport: Transport.RMQ,
        options: { urls: [ENV.RABBITMQ_URI], queue: 'payments' },
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
