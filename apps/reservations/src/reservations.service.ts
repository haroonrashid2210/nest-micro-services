import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { ReservationsRepository } from './reservations.repository';
import { CONSTANT, IUser } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(CONSTANT.SERVICE.PAYMENTS) private readonly paymentsService: ClientProxy,
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(user: IUser, createReservationDto: CreateReservationDto) {
    return await this.reservationsRepository.create({
      ...createReservationDto,
      userId: user._id,
    });
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
