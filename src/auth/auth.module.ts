import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user-service';

@Module({
    imports: [
        JwtModule.register({
          global: true,
          secret: "jwtConstants.secret",
          signOptions: { expiresIn: '60s' },
        }),
        UserModule, // Add this line
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService],
      exports: [AuthService, JwtModule, UserModule],
})
export class AuthModule {}
