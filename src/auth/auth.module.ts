import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user-service';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from 'src/config/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
    imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
        }),
        JwtModule.register({
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.expired,
          },
        }),
        UserModule, // Add this line
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtStrategy],
      exports: [AuthService, UserModule],
})
export class AuthModule {}
