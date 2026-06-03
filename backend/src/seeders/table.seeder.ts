import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Table } from 'src/tables/entities/table.entity';

@Injectable()
export class TablesSeeder implements Seeder {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async seed(): Promise<any> {
    const tablesData = [
      { name: 'Bàn 1', isDeleted: false },
      { name: 'Bàn 2', isDeleted: false },
      { name: 'Bàn 3', isDeleted: false },
      { name: 'Bàn 4', isDeleted: false },
      { name: 'Bàn 5', isDeleted: false },
      { name: 'Bàn 6', isDeleted: false },
      { name: 'Bàn 7', isDeleted: false },
      { name: 'Bàn 8', isDeleted: false },
      { name: 'Bàn 9', isDeleted: false },
      { name: 'Bàn 10', isDeleted: false },
      { name: 'Bàn 11', isDeleted: false },
      { name: 'Bàn 12', isDeleted: false },
      { name: 'Bàn 13', isDeleted: false },
      { name: 'Bàn 14', isDeleted: false },
      { name: 'Bàn 15', isDeleted: false },
    ];

    return this.tableRepository.save(tablesData);
  }

  async drop(): Promise<any> {
    return this.tableRepository.delete({});
  }
}