import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { RoleFunctionsService } from './role-functions.service';
import { CreateRoleFunctionDto } from './dto/create-role-function.dto';
import { UpdateRoleFunctionDto } from './dto/update-role-function.dto';
import { RoleFunctionResponseDto } from './dto/response-role-function.dto';

@Controller('role-functions')
export class RoleFunctionsController {
    constructor(private readonly roleFunctionsService: RoleFunctionsService) {}

    @Get()
    async findAll(): Promise<RoleFunctionResponseDto[]> {
        return this.roleFunctionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RoleFunctionResponseDto> {
        try {
            return await this.roleFunctionsService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`RoleFunction with ID ${id} not found`);
        }
    }

    @Get('role/:roleId')
    async findByRoleId(@Param('roleId') roleId: number): Promise<RoleFunctionResponseDto[]> {
        return this.roleFunctionsService.findByRoleId(roleId);
    }

    @Post()
    async create(@Body() createRoleFunctionDto: CreateRoleFunctionDto): Promise<RoleFunctionResponseDto> {
        return this.roleFunctionsService.create(createRoleFunctionDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateRoleFunctionDto: UpdateRoleFunctionDto,
    ): Promise<RoleFunctionResponseDto> {
        try {
            return await this.roleFunctionsService.update(id, updateRoleFunctionDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`RoleFunction with ID ${id} not found`);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        try {
            return await this.roleFunctionsService.remove(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`RoleFunction with ID ${id} not found`);
        }
    }
} 