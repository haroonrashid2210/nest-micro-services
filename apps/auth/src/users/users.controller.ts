import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.reservationsService.findOne(id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
  //     return this.reservationsService.update(id, updateReservationDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.reservationsService.remove(+id);
  //   }
}
