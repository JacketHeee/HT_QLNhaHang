import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseDto } from './dto/response-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async findAll(): Promise<RoleResponseDto[]> {
        const roles = await this.rolesRepository.find({
            where: { isDeleted: false }
        });
        
        return roles.map(role => {
            const { ID, tenQuyen } = role;
            return { ID, tenQuyen };
        });
    }

    async findOne(ID: number): Promise<RoleResponseDto> {
        const role = await this.rolesRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!role) {
            throw new NotFoundException(`Role with ID ${ID} not found`);
        }
        
        const { tenQuyen } = role;
        return { ID, tenQuyen };
    }

    async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
        const role = this.rolesRepository.create(createRoleDto);
        const savedRole = await this.rolesRepository.save(role);
        
        const { ID, tenQuyen } = savedRole;
        return { ID, tenQuyen };
    }

    async update(ID: number, updateRoleDto: UpdateRoleDto): Promise<RoleResponseDto> {
        const role = await this.rolesRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!role) {
            throw new NotFoundException(`Role with ID ${ID} not found`);
        }
        
        Object.assign(role, updateRoleDto);
        
        const updatedRole = await this.rolesRepository.save(role);
        
        const { tenQuyen } = updatedRole;
        return { ID, tenQuyen };
    }

    async remove(ID: number): Promise<void> {
        const role = await this.rolesRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!role) {
            throw new NotFoundException(`Role with ID ${ID} not found`);
        }
        
        // Soft delete
        role.isDeleted = true;
        await this.rolesRepository.save(role);
    }
} 