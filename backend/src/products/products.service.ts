import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/response-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService{ //implements OnModuleInit {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.productsRepository.find({
            where: { isDelete: false }, // Lọc sản phẩm chưa bị xóa
        });
        return products.map(product => {
            const {ID, tenMonAn, moTa, giaBan, tenHinhAnh} = product; //phân rã để tạo đối tượng response
            return {ID, tenMonAn, moTa, giaBan, tenHinhAnh};
        });
    }

    async findOne(ID: number): Promise<ProductResponseDto> {
        const product = await this.productsRepository.findOneBy({ ID });
        if (!product) {
            throw new Error('Product not found');
        }
        const {ID: productID, tenMonAn, moTa, giaBan, tenHinhAnh} = product;
        return {ID: productID, tenMonAn, moTa, giaBan, tenHinhAnh};
    }

    async create(newProduct: CreateProductDto): Promise<ProductResponseDto> {
        const product = this.productsRepository.create(newProduct);
        const savedProduct = await this.productsRepository.save(product);

        const {ID: productID, tenMonAn, moTa, giaBan, tenHinhAnh} = savedProduct;
        return {ID: productID, tenMonAn, moTa, giaBan, tenHinhAnh};
    }

    async update(ID: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>{
        const product = await this.productsRepository.findOneBy({ID});
        if (!product) {
            throw new Error('Product not found');
        }
        Object.assign(product, updateProductDto) // chép các thuộc tính từ nguồn -> đích

        const updatedProductDto = await this.productsRepository.save(product);

        const {ID: productID, tenMonAn, moTa, giaBan, tenHinhAnh} = updatedProductDto;
        return {ID: productID, tenMonAn, moTa, giaBan, tenHinhAnh};
    }

    async delete(ID: number): Promise<void> {
        const product = await this.productsRepository.findOneBy({ ID });
        if (!product) {
          throw new Error('Product not found');
        }
        product.isDelete = true;
        await this.productsRepository.save(product);
    }
}