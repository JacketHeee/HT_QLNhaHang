import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleFunctionsService } from 'src/role_functions/role-functions.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleFunctionsService: RoleFunctionsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles from decorator
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }
    
    // Get required function from decorator
    const requiredFunction = this.reflector.get<string>('function', context.getHandler());
    
    // Get user from request
    const { user } = context.switchToHttp().getRequest();
    
    // Check if user exists and has a role
    if (!user || !user.roleId) {
      throw new ForbiddenException('User has no assigned role');
    }
    
    // If only role check is needed
    if (!requiredFunction) {
      return requiredRoles.includes(user.role);
    }
    
    // If function check is needed
    try {
      // Get all role-function mappings for this role
      const roleFunctions = await this.roleFunctionsService.findByRoleId(user.roleId);
      
      // Check if this role has the required function
      const hasFunctionAccess = roleFunctions.some(
        rf => rf.function && rf.function.tenChucNang === requiredFunction
      );
      
      return hasFunctionAccess;
    } catch (error) {
      return false;
    }
  }
}
