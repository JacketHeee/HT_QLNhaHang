import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { Feature } from '../features/entities/feature.entity';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}

  async checkUserAccess(user: any, featureCodes: string[]): Promise<boolean> {
    if (!user || !user.role || !user.userId) {
      throw new ForbiddenException('Không có quyền truy cập');
    }

    // Admin luôn có đầy đủ quyền
    if (user.role === 'admin') {
      return true;
    }

    // Lấy role từ database kèm theo features
    const role = await this.roleRepository.findOne({
      where: { name: user.role },
      relations: ['features'],
    });

    if (!role) {
      throw new ForbiddenException('Không tìm thấy thông tin quyền');
    }

    // Kiểm tra role có tất cả các tính năng cần thiết không
    const userFeatureCodes = role.features.map(feature => feature.code);
    
    for (const code of featureCodes) {
      if (!userFeatureCodes.includes(code)) {
        return false;
      }
    }

    return true;
  }

  async getRoleFeatures(roleName: string): Promise<Feature[]> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
      relations: ['features'],
    });

    if (!role) {
      throw new ForbiddenException('Không tìm thấy thông tin quyền');
    }

    return role.features;
  }

  async checkIfUserHasFeature(user: any, featureCode: string): Promise<boolean> {
    return this.checkUserAccess(user, [featureCode]);
  }
}
