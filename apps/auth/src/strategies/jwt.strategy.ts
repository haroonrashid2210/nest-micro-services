import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ENV } from '@app/common';
import { ITokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Authentication]),
      secretOrKey: ENV.JWT.SECRET,
    });
  }

  async validate({ userId }: ITokenPayload) {
    return await this.userService.findOne(userId);
  }
}
