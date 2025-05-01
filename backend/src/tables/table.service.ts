import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
    constructor(@InjectRepository(Table) private readonly tableRepository: Repository<Table>) {}

    findAll() {
        return this.tableRepository.find({where: {isDeleted: false}});
    }

    async findOne(id: number) {
        const table = await this.tableRepository.findOneBy({id});
        if(!table || table.isDeleted) {
            throw new NotFoundException(`Table with id ${id} not found`);
        }
        return {
            id: table.id,
            name: table.name
        };
    }

    async create(createTableDto: CreateTableDto) {
        const table = this.tableRepository.create(createTableDto);
        await this.tableRepository.save(table);
        return {
            id: table.id,
            name: table.name,
        };
    }

    async update(id: number, updateTableDto: UpdateTableDto) {
        const table = await this.tableRepository.findOneBy({id});
        if(!table || table.isDeleted) {
            throw new NotFoundException(`Table with id ${id} not found`);
        }
        await this.tableRepository.update(id, updateTableDto);
        return {
            id: id,
            name: updateTableDto.name
        };
    }

    async delete(id: number) {
        const table = await this.tableRepository.findOneBy({id});
        if(!table) {
            throw new NotFoundException(`Table with id ${id} not found`);
        }
        table.isDeleted = true;
        await this.tableRepository.save(table);
        return {
            id: table.id,
            name: table.name
        }
    }
}
