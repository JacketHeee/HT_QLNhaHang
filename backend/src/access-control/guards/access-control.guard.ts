import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../access-control.service';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const features = this.reflector.get<string[]>('features', context.getHandler());
    
    // Nếu không yêu cầu tính năng cụ thể nào, cho phép truy cập
    if (!features || features.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.accessControlService.checkUserAccess(user, features);
  }
} 