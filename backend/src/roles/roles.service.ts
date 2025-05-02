import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    
    if (!role) {
      throw new NotFoundException(`Quyền với ID ${id} không tồn tại`);
    }
    
    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Kiểm tra tên quyền đã tồn tại chưa
    const existingRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    
    if (existingRole) {
      throw new ConflictException(`Quyền với tên ${createRoleDto.name} đã tồn tại`);
    }
    
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    
    // Nếu có cập nhật tên, kiểm tra tên mới có trùng với quyền khác không
    if (updateRoleDto.name) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      
      if (existingRole && existingRole.id !== id) {
        throw new ConflictException(`Quyền với tên ${updateRoleDto.name} đã tồn tại`);
      }
    }
    
    // Cập nhật thông tin
    Object.assign(role, updateRoleDto);
    
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
  }
} 