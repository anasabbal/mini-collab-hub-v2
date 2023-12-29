import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCommand } from './command/login-command';
import { RegisterCommand } from './command/register-command';
import { UserService } from 'src/user/user-service';
import { AuthGuard } from './guard/auth-guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    @Post('/login')
    async login(@Body() req: LoginCommand): Promise<any> {
        return this.authService.login(req);
    }
    @Post('/register')
    async register(@Body() req: RegisterCommand) {
        return this.userService.createUser(req);
    }
    @UseGuards(AuthGuard)
    @Get('/profile')
    async profile(@Req() req: any) {
        const userId = req.user.id;
        return await this.authService.profile(userId);
    }
}
