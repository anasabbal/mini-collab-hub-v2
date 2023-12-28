import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user-service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from './command/login-command';
import { jwtConfig } from 'src/config/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async validate(email: string, pass: string): Promise<any> {
    // find user by email
    const user = await this.userService.findUserByEmail(email);
    // compare password
    const isMatch = await bcrypt.compare(pass, user.password);
    this.logger.log(` with id ${user.id} fetched successfully !`)

    if(isMatch) {
      const token = this.generateJWT({
        sub: user.id,
        firstName: user.firstName,
        email: user.email
      });
      return {
        statusCode: 200,
        message: 'Login successfully !',
        accessToken: token,
      }
    }
    else{
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: jwtConfig.expired,
    });
  }

  async login(req: LoginCommand) {
    return this.validate(req.email, req.password);
  }
  async profile(user_id: string) {
    return await this.userService.getUserById(user_id);
  }
}