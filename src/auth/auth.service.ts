import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user-service";
import { User } from "../user/schema/user-schema";
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from './command/login-command';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.userService.findUserByEmail(email);

    if (user) {
      const isPasswordValid = await user.compareEncryptedPassword(password);
      console.log(isPasswordValid);

      if (isPasswordValid) {
        return true;
        // Password is valid
        //const payload = { sub: user.userId, username: user.username };
        //return {
        //  access_token: await this.jwtService.signAsync(payload),
        //};
      }
      return false;
    }
  }
}