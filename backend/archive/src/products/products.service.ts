import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async onModuleInit() {
        const count = await this.productsRepository.count();
        if (count === 0) {
            const sampleProducts = [
                {
                    name: 'Hamburger',
                    description: 'Burger with beef patty, lettuce, tomato, and cheese',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/hamburger.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 122.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 122.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
            ];
            await this.productsRepository.save(sampleProducts);
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async create(newProduct: Partial<Product>): Promise<Product> {
        const product = this.productsRepository.create(newProduct);
        return this.productsRepository.save(product);
    }
}