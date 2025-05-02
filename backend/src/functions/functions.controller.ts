import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { FunctionResponseDto } from './dto/response-function.dto';

@Controller('functions')
export class FunctionsController {
    constructor(private readonly functionsService: FunctionsService) {}

    @Get()
    async findAll(): Promise<FunctionResponseDto[]> {
        return this.functionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<FunctionResponseDto> {
        try {
            return await this.functionsService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Function with ID ${id} not found`);
        }
    }

    @Post()
    async create(@Body() createFunctionDto: CreateFunctionDto): Promise<FunctionResponseDto> {
        return this.functionsService.create(createFunctionDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateFunctionDto: UpdateFunctionDto,
    ): Promise<FunctionResponseDto> {
        try {
            return await this.functionsService.update(id, updateFunctionDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Function with ID ${id} not found`);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        try {
            return await this.functionsService.remove(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Function with ID ${id} not found`);
        }
    }
} 