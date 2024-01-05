import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ENV } from '@app/common';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(user: UserDocument, response: Response) {
    console.log('user: ', user);
    const tokenPayload = {
      userId: user._id.toString(),
    };

    const token = this.jwtService.sign(tokenPayload, { expiresIn: ENV.JWT.EXPIRATION });

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + Number(ENV.JWT.EXPIRATION));

    response.cookie('Authentication', token, { httpOnly: true, expires });
  }
}
