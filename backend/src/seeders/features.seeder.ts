import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder'; 
import { Feature } from 'src/features/entities/feature.entity';

@Injectable()
export class FeaturesSeeder implements Seeder {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async seed(): Promise<any> {
    const featuresData = [
      { name: 'taikhoan', code: 'taikhoan', isDeleted: false },
      { name: 'nhanvien', code: 'nhanvien', isDeleted: false },
      { name: 'phanquyen', code: 'phanquyen', isDeleted: false },
      { name: 'donhang', code: 'donhang', isDeleted: false },
      { name: 'bep', code: 'bep', isDeleted: false },
      { name: 'monan', code: 'monan', isDeleted: false },
      { name: 'banan', code: 'banan', isDeleted: false },
    ];

    return this.featureRepository.save(featuresData);
  }

  async drop(): Promise<any> {
    return this.featureRepository.delete({});
  }
}