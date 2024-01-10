import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { ReservationsRepository } from './reservations.repository';
import { CONSTANT, IUser } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(CONSTANT.SERVICE.PAYMENTS) private readonly paymentsService: ClientProxy,
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(user: IUser, createReservationDto: CreateReservationDto) {
    return this.paymentsService.send('create_charge', { ...createReservationDto.charge, email: user.email }).pipe(
      map(async (res) => {
        return await this.reservationsRepository.create({
          ...createReservationDto,
          userId: user._id,
          invoiceId: res.id,
        });
      }),
    );
  }

  async findAll() {
    return await this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return await this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationsRepository.findOneAndUpdate({ _id }, { $set: updateReservationDto });
  }

  async remove(_id: number) {
    return await this.reservationsRepository.findOneAndDelete({ _id });
  }
}
