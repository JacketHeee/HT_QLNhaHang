import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseDto } from './dto/response-role.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RequireFunction } from 'src/decorators/function.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    @Roles('Admin')
    @RequireFunction('QuanLyVaiTro')
    async findAll(): Promise<RoleResponseDto[]> {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @Roles('Admin')
    @RequireFunction('QuanLyVaiTro')
    async findOne(@Param('id') id: number): Promise<RoleResponseDto> {
        try {
            return await this.rolesService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
    }

    @Post()
    @Roles('Admin')
    @RequireFunction('QuanLyVaiTro')
    async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
        return this.rolesService.create(createRoleDto);
    }

    @Put(':id')
    @Roles('Admin')
    @RequireFunction('QuanLyVaiTro')
    async update(
        @Param('id') id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<RoleResponseDto> {
        try {
            return await this.rolesService.update(id, updateRoleDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
    }

    @Delete(':id')
    @Roles('Admin')
    @RequireFunction('QuanLyVaiTro')
    async remove(@Param('id') id: number): Promise<void> {
        try {
            return await this.rolesService.remove(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
    }
} 