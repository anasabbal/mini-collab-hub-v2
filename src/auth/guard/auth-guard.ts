import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';
import { Request } from 'express';
import { jwtConfig } from 'src/config/jwt';



export class AuthGuard extends AuthGuardPassport('jwt') {

    constructor(private jwtService: JwtService){
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConfig.secret
            });
            request['token'] = payload;
        }catch {
            throw new UnauthorizedException();
        }
        return true;;
    }

    handleRequest(err, user,info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type , token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}