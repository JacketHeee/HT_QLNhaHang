import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleFunction } from './entities/role_function.entity';
import { CreateRoleFunctionDto } from './dto/create-role-function.dto';
import { UpdateRoleFunctionDto } from './dto/update-role-function.dto';
import { RoleFunctionResponseDto } from './dto/response-role-function.dto';

@Injectable()
export class RoleFunctionsService {
    constructor(
        @InjectRepository(RoleFunction)
        private roleFunctionsRepository: Repository<RoleFunction>,
    ) {}

    async findAll(): Promise<RoleFunctionResponseDto[]> {
        const roleFunctions = await this.roleFunctionsRepository.find({
            where: { isDeleted: false },
            relations: ['function', 'role'],
        });
        
        return roleFunctions.map(roleFunction => {
            const { ID, function: func, role } = roleFunction;
            return { ID, function: func, role };
        });
    }

    async findOne(ID: number): Promise<RoleFunctionResponseDto> {
        const roleFunction = await this.roleFunctionsRepository.findOne({
            where: { ID, isDeleted: false },
            relations: ['function', 'role'],
        });
        
        if (!roleFunction) {
            throw new NotFoundException(`RoleFunction with ID ${ID} not found`);
        }
        
        const { function: func, role } = roleFunction;
        return { ID, function: func, role };
    }

    async findByRoleId(roleId: number): Promise<RoleFunctionResponseDto[]> {
        const roleFunctions = await this.roleFunctionsRepository.find({
            where: { IDQuyen: roleId, isDeleted: false },
            relations: ['function', 'role'],
        });
        
        return roleFunctions.map(roleFunction => {
            const { ID, function: func, role } = roleFunction;
            return { ID, function: func, role };
        });
    }

    async create(createRoleFunctionDto: CreateRoleFunctionDto): Promise<RoleFunctionResponseDto> {
        const roleFunction = this.roleFunctionsRepository.create(createRoleFunctionDto);
        const savedRoleFunction = await this.roleFunctionsRepository.save(roleFunction);
        
        const loadedRoleFunction = await this.roleFunctionsRepository.findOne({
            where: { ID: savedRoleFunction.ID },
            relations: ['function', 'role'],
        });
        
        if (!loadedRoleFunction) {
            throw new NotFoundException(`Could not load newly created RoleFunction`);
        }
        
        const { ID, function: func, role } = loadedRoleFunction;
        return { ID, function: func, role };
    }

    async update(ID: number, updateRoleFunctionDto: UpdateRoleFunctionDto): Promise<RoleFunctionResponseDto> {
        const roleFunction = await this.roleFunctionsRepository.findOne({
            where: { ID, isDeleted: false },
            relations: ['function', 'role'],
        });
        
        if (!roleFunction) {
            throw new NotFoundException(`RoleFunction with ID ${ID} not found`);
        }
        
        Object.assign(roleFunction, updateRoleFunctionDto);
        
        const updatedRoleFunction = await this.roleFunctionsRepository.save(roleFunction);
        
        const { function: func, role } = updatedRoleFunction;
        return { ID, function: func, role };
    }

    async remove(ID: number): Promise<void> {
        const roleFunction = await this.roleFunctionsRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!roleFunction) {
            throw new NotFoundException(`RoleFunction with ID ${ID} not found`);
        }
        
        // Soft delete
        roleFunction.isDeleted = true;
        await this.roleFunctionsRepository.save(roleFunction);
    }
} 