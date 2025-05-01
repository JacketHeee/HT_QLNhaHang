import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService implements OnModuleInit {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(newProduct: Partial<Product>): Promise<Product>;
}
