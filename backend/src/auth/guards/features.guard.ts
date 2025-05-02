import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Feature } from '../../features/entities/feature.entity';

@Injectable()
export class FeaturesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeatures = this.reflector.get<string[]>('features', context.getHandler());
    if (!requiredFeatures || requiredFeatures.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.role || !user.userId) {
      throw new ForbiddenException('Bạn không có quyền truy cập tính năng này');
    }

    // Admin role có thể truy cập tất cả tính năng
    if (user.role === 'admin') {
      return true;
    }

    // Lấy thông tin role đầy đủ từ database bao gồm features
    const role = await this.roleRepository.findOne({
      where: { name: user.role },
      relations: ['features'],
    });

    if (!role) {
      throw new ForbiddenException('Không tìm thấy thông tin quyền của bạn');
    }

    // Kiểm tra xem role có tất cả các tính năng yêu cầu không
    const featureCodes = role.features.map(feature => feature.code);
    const hasAllFeatures = requiredFeatures.every(code => featureCodes.includes(code));

    if (!hasAllFeatures) {
      throw new ForbiddenException('Bạn không có quyền truy cập tính năng này');
    }

    return true;
  }
} 