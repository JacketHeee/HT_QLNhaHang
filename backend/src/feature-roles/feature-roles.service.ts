import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureRole } from './entities/feature-role.entity';
import { CreateFeatureRoleDto } from './dto/create-feature-role.dto';
import { Role } from '../roles/entities/role.entity';
import { Feature } from '../features/entities/feature.entity';

@Injectable()
export class FeatureRolesService {
  constructor(
    @InjectRepository(FeatureRole)
    private readonly featureRoleRepository: Repository<FeatureRole>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async findAll(): Promise<FeatureRole[]> {
    return this.featureRoleRepository.find({
      relations: ['role', 'feature'],
    });
  }

  async findByRole(roleId: number): Promise<FeatureRole[]> {
    return this.featureRoleRepository.find({
      where: { roleId },
      relations: ['feature'],
    });
  }

  async findByFeature(featureId: number): Promise<FeatureRole[]> {
    return this.featureRoleRepository.find({
      where: { featureId },
      relations: ['role'],
    });
  }

  async create(createFeatureRoleDto: CreateFeatureRoleDto): Promise<FeatureRole> {
    // Kiểm tra role có tồn tại không
    const role = await this.roleRepository.findOne({
      where: { id: createFeatureRoleDto.roleId },
    });
    
    if (!role) {
      throw new NotFoundException(`Quyền với ID ${createFeatureRoleDto.roleId} không tồn tại`);
    }
    
    // Kiểm tra feature có tồn tại không
    const feature = await this.featureRepository.findOne({
      where: { id: createFeatureRoleDto.featureId },
    });
    
    if (!feature) {
      throw new NotFoundException(`Chức năng với ID ${createFeatureRoleDto.featureId} không tồn tại`);
    }
    
    // Kiểm tra mối quan hệ đã tồn tại chưa
    const existingRelation = await this.featureRoleRepository.findOne({
      where: {
        roleId: createFeatureRoleDto.roleId,
        featureId: createFeatureRoleDto.featureId,
      },
    });
    
    if (existingRelation) {
      throw new ConflictException(`Mối quan hệ giữa quyền ${role.name} và chức năng ${feature.name} đã tồn tại`);
    }
    
    const featureRole = this.featureRoleRepository.create(createFeatureRoleDto);
    return this.featureRoleRepository.save(featureRole);
  }

  async remove(id: number): Promise<void> {
    const featureRole = await this.featureRoleRepository.findOne({
      where: { id },
    });
    
    if (!featureRole) {
      throw new NotFoundException(`Mối quan hệ với ID ${id} không tồn tại`);
    }
    
    await this.featureRoleRepository.remove(featureRole);
  }

  async removeByRoleAndFeature(roleId: number, featureId: number): Promise<void> {
    const featureRole = await this.featureRoleRepository.findOne({
      where: {
        roleId,
        featureId,
      },
    });
    
    if (!featureRole) {
      throw new NotFoundException(`Mối quan hệ giữa quyền ID ${roleId} và chức năng ID ${featureId} không tồn tại`);
    }
    
    await this.featureRoleRepository.remove(featureRole);
  }

  // Cập nhật tất cả chức năng cho một quyền
  async updateRoleFeatures(roleId: number, featureIds: number[]): Promise<void> {
    // Kiểm tra role có tồn tại không
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });
    
    if (!role) {
      throw new NotFoundException(`Quyền với ID ${roleId} không tồn tại`);
    }
    
    // Kiểm tra tất cả feature có tồn tại không
    for (const featureId of featureIds) {
      const feature = await this.featureRepository.findOne({
        where: { id: featureId },
      });
      
      if (!feature) {
        throw new NotFoundException(`Chức năng với ID ${featureId} không tồn tại`);
      }
    }
    
    // Xóa tất cả mối quan hệ hiện có của role này
    await this.featureRoleRepository.delete({ roleId });
    
    // Tạo mới các mối quan hệ
    const featureRoles = featureIds.map(featureId => ({
      roleId,
      featureId,
    }));
    
    if (featureRoles.length > 0) {
      await this.featureRoleRepository.save(featureRoles);
    }
  }
} 