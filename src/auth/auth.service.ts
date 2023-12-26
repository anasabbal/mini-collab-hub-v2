import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user-service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from './command/login-command';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    this.logger.log(` with id ${user.id} fetched successfully !`)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async login(req: LoginCommand) {
    return this.validate(req.email, req.password);
  }
}