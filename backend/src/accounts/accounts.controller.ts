import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponseDto } from './dto/response-account.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RequireFunction } from 'src/decorators/function.decorator';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    @Roles('Admin')
    @RequireFunction('QuanLyTaiKhoan')
    async findAll(): Promise<AccountResponseDto[]> {
        return this.accountsService.findAll();
    }

    @Get(':id')
    @Roles('Admin')
    @RequireFunction('QuanLyTaiKhoan')
    async findOne(@Param('id') id: number): Promise<AccountResponseDto> {
        try {
            return await this.accountsService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
    }

    @Post()
    @Roles('Admin')
    @RequireFunction('QuanLyTaiKhoan')
    async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
        return this.accountsService.create(createAccountDto);
    }

    @Put(':id')
    @Roles('Admin')
    @RequireFunction('QuanLyTaiKhoan')
    async update(
        @Param('id') id: number,
        @Body() updateAccountDto: UpdateAccountDto,
    ): Promise<AccountResponseDto> {
        try {
            return await this.accountsService.update(id, updateAccountDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
    }

    @Delete(':id')
    @Roles('Admin')
    @RequireFunction('QuanLyTaiKhoan')
    async remove(@Param('id') id: number): Promise<void> {
        try {
            return await this.accountsService.remove(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
    }
} 