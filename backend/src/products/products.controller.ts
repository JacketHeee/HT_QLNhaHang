import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/response-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @Roles('monan', 'donhang')
    async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findAll();
        return products;
    }

    @Get(':id')
    @Roles('monan', 'donhang')
    async findOne(@Param('id') id: number): Promise<ProductResponseDto> {
        const product = await this.productsService.findOne(id)  //đã validate
        return product;
    }

    @Post()
    @Roles('monan', 'donhang')
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        const product = await this.productsService.create(createProductDto);
        return product;
    }

    @Put(':id')
    @Roles('monan', 'donhang')
    async update(@Param('id') id: number, updatedProductDto: UpdateProductDto): Promise<ProductResponseDto>{
        const product = await this.productsService.update(id, updatedProductDto);
        return product;
    }

    @Put(':id/lock')
    @Roles('monan', 'donhang')
    async lock(@Param('id') id: number): Promise<void>{
        const product = await this.productsService.lock(id);
    }

    @Put(':id/unlock')
    @Roles('monan', 'donhang')
    async unLock(@Param('id') id: number): Promise<void>{
        const product = await this.productsService.unLock(id);
    }

    @Delete(':id')
    @Roles('monan', 'donhang')
    async delete(@Param('id') id: number): Promise<void>{
        const product = await this.productsService.delete(id);
    }
}