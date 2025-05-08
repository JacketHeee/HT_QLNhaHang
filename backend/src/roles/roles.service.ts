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
    const rs = await this.roleRepository.find({
      where: {isDeleted: false},
      order: { id: 'ASC' }
    })
    return rs;
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
    
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    
    
    // Cập nhật thông tin
    Object.assign(role, updateRoleDto);
    
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    if(!role){
      throw new NotFoundException("không thấy role");
    }
    role.isDeleted = true;
    await this.roleRepository.save(role);
  }
} 