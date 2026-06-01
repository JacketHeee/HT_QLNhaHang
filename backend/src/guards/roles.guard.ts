import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FeatureRolesService } from 'src/feature-roles/feature-roles.service';
import { PermissionService } from './permission.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());//đổi lại permission: monan, bep, ... 
    if (!roles) {
      return true;//không có decorator @Roles
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    const feature = await this.permissionService.getFeatureNamesByRoleName(user.role) ;
    
    const hasCommon = roles.some(f => feature.includes(f));
    console.log('feature bên role yêu cầu',roles);
    console.log('feature của tài khoản hiện có',feature);

    return hasCommon;

  }
}
