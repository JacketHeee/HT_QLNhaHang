import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/response-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findAll();
        return products;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductResponseDto> {
        const product = await this.productsService.findOne(id)  //đã validate
        return product;
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        const product = await this.productsService.create(createProductDto);
        return product;
    }

    @Put(':id')
    async update(@Param('id') id: number, updatedProductDto: UpdateProductDto): Promise<ProductResponseDto>{
        const product = await this.productsService.update(id, updatedProductDto);
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void>{
        const product = await this.productsService.delete(id);
    }
}