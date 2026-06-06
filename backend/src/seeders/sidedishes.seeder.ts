import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { SideDish } from 'src/sidedishes/entities/sidedish.entity';

@Injectable()
export class SideDishesSeeder implements Seeder {
  constructor(
    @InjectRepository(SideDish)
    private readonly sideDishRepository: Repository<SideDish>,
  ) {}

  async seed(): Promise<any> {
    const sideDishesData = [
      { tenMonAnKem: 'Bắp cải trộn', isDeleted: false },
      { tenMonAnKem: 'Bắp xào bơ', isDeleted: false },
      { tenMonAnKem: 'Bánh mì bơ tỏi', isDeleted: false },
      { tenMonAnKem: 'Cơm', isDeleted: false },
      { tenMonAnKem: 'Salad Mayo', isDeleted: false },
      { tenMonAnKem: 'Salad sống', isDeleted: false },
      { tenMonAnKem: 'Sốt chấm phô mai', isDeleted: false },
      { tenMonAnKem: 'Trân châu trắng', isDeleted: false },
      { tenMonAnKem: 'Trân châu đen', isDeleted: false },
      { tenMonAnKem: 'Thạch dừa', isDeleted: false },
      { tenMonAnKem: 'Thạch cafe', isDeleted: false },
    ];

    return this.sideDishRepository.save(sideDishesData);
  }

  async drop(): Promise<any> {
    return this.sideDishRepository.delete({});
  }
}