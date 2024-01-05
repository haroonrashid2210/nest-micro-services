import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return await this.usersRepository.findOne({ _id });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new NotFoundException();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();
    return user;
  }
}
