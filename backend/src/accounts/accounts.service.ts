import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponseDto } from './dto/response-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountsRepository: Repository<Account>,
    ) {}

    async findAll(): Promise<AccountResponseDto[]> {
        const accounts = await this.accountsRepository.find({
            where: { isDeleted: false },
            relations: ['role', 'employee'],
        });
        
        return accounts.map(account => {
            const { ID, userName, role, employee } = account;
            return { ID, userName, role, employee };
        });
    }

    async findOne(ID: number): Promise<AccountResponseDto> {
        const account = await this.accountsRepository.findOne({
            where: { ID, isDeleted: false },
            relations: ['role', 'employee'],
        });
        
        if (!account) {
            throw new NotFoundException(`Account with ID ${ID} not found`);
        }
        
        const { userName, role, employee } = account;
        return { ID, userName, role, employee };
    }

    async create(createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createAccountDto.passWord, salt);
        
        const account = this.accountsRepository.create({
            ...createAccountDto,
            passWord: hashedPassword,
        });
        
        const savedAccount = await this.accountsRepository.save(account);
        
        const { ID, userName, role, employee } = savedAccount;
        return { ID, userName, role, employee };
    }

    async update(ID: number, updateAccountDto: UpdateAccountDto): Promise<AccountResponseDto> {
        const account = await this.accountsRepository.findOne({
            where: { ID, isDeleted: false },
            relations: ['role', 'employee'],
        });
        
        if (!account) {
            throw new NotFoundException(`Account with ID ${ID} not found`);
        }
        
        // Hash password if it's being updated
        if (updateAccountDto.passWord) {
            const salt = await bcrypt.genSalt();
            updateAccountDto.passWord = await bcrypt.hash(updateAccountDto.passWord, salt);
        }
        
        Object.assign(account, updateAccountDto);
        
        const updatedAccount = await this.accountsRepository.save(account);
        
        const { userName, role, employee } = updatedAccount;
        return { ID, userName, role, employee };
    }

    async remove(ID: number): Promise<void> {
        const account = await this.accountsRepository.findOne({
            where: { ID, isDeleted: false }
        });
        
        if (!account) {
            throw new NotFoundException(`Account with ID ${ID} not found`);
        }
        
        // Soft delete
        account.isDeleted = true;
        await this.accountsRepository.save(account);
    }

    async findByUsername(userName: string): Promise<Account | null> {
        return this.accountsRepository.findOne({
            where: { userName, isDeleted: false },
            relations: ['role', 'employee'],
        });
    }
} 