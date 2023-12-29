import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorator/roles.decorator";
import { Role } from "src/enums/role.enums";
import { AccessControlService } from "../../shared/access.control";

export class TokenDto {
    id: number;
    role: Role;
}


/**
 * RoleGuard class which will compare the roles assigned to the current
 * user to the actual roles required by the current route being processed
 */
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private accessControlService: AccessControlService,
    ){}
    
    
    canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
    
        const request = context.switchToHttp().getRequest();
        const token = request['token'] as TokenDto;
    
        for (let role of requiredRoles) {
          const result = this.accessControlService.isAuthorized({
            requiredRole: role,
            currentRole: token.role,
          });
    
          if (result) {
            return true;
          }
        }
    
        return false;
      }
}