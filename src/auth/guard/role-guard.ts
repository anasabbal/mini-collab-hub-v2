import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorator/roles.decorator";
import { Role } from "src/enums/role.enums";




/**
 * RoleGuard class which will compare the roles assigned to the current
 * user to the actual roles required by the current route being processed
 */
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector){}
    
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), context.getClass()
        ]);
        if(!requiredRoles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}