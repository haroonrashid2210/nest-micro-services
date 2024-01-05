import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ENV, LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    LoggerModule,
    UsersModule,
    JwtModule.register({
      secret: ENV.JWT.SECRET,
      signOptions: {
        expiresIn: ENV.JWT.EXPIRATION,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
