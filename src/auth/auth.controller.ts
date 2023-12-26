import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCommand } from './command/login-command';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enums';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post()
    @Roles(Role.ADMIN)
    async login(@Body() req: LoginCommand): Promise<any> {
        return this.authService.login(req);
    }
}
