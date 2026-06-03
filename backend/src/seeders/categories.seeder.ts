import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seed(): Promise<any> {
    const categoriesData = [
      { tenLoaiMonAn: 'Hamburger', isDeleted: false },
      { tenLoaiMonAn: 'Coffee', isDeleted: false },
      { tenLoaiMonAn: 'Gà rán', isDeleted: false },
      { tenLoaiMonAn: 'Nước uống', isDeleted: false },
      { tenLoaiMonAn: 'Tráng miệng', isDeleted: false },
    ];
    return this.categoryRepository.save(categoriesData);
  }

  async drop(): Promise<any> {
    await this.productRepository.delete({});
    return this.categoryRepository.delete({});
  }
}