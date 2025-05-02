import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Function } from './entities/function.entity';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { FunctionResponseDto } from './dto/response-function.dto';

@Injectable()
export class FunctionsService {
    constructor(
        @InjectRepository(Function)
        private functionsRepository: Repository<Function>,
    ) {}

    async findAll(): Promise<FunctionResponseDto[]> {
        const functions = await this.functionsRepository.find({
            where: { isDeleted: false }
        });
        
        return functions.map(func => {
            const { ID, tenChucNang } = func;
            return { ID, tenChucNang };
        });
    }

    async findOne(ID: number): Promise<FunctionResponseDto> {
        const func = await this.functionsRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!func) {
            throw new NotFoundException(`Function with ID ${ID} not found`);
        }
        
        const { tenChucNang } = func;
        return { ID, tenChucNang };
    }

    async create(createFunctionDto: CreateFunctionDto): Promise<FunctionResponseDto> {
        const func = this.functionsRepository.create(createFunctionDto);
        const savedFunction = await this.functionsRepository.save(func);
        
        const { ID, tenChucNang } = savedFunction;
        return { ID, tenChucNang };
    }

    async update(ID: number, updateFunctionDto: UpdateFunctionDto): Promise<FunctionResponseDto> {
        const func = await this.functionsRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!func) {
            throw new NotFoundException(`Function with ID ${ID} not found`);
        }
        
        Object.assign(func, updateFunctionDto);
        
        const updatedFunction = await this.functionsRepository.save(func);
        
        const { tenChucNang } = updatedFunction;
        return { ID, tenChucNang };
    }

    async remove(ID: number): Promise<void> {
        const func = await this.functionsRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!func) {
            throw new NotFoundException(`Function with ID ${ID} not found`);
        }
        
        // Soft delete
        func.isDeleted = true;
        await this.functionsRepository.save(func);
    }
} 