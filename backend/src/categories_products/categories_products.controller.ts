import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Category_ProductService } from "./categories_products.service";
import { Category_ProductResponseDto } from "./dto/response-categories_products.dto";
import { CreateCateGory_ProductDto } from "./dto/create-categories_products.dto";

@Controller("category_product")
export class Category_ProductController {

    constructor(private category_productService: Category_ProductService){}

    @Get()
    async findAll(): Promise<Category_ProductResponseDto[]>{
        const categories_products = await this.category_productService.findAll();
        return categories_products;
    }

    @Get(":idMonAn/:idLoaiMonAn")
    async findOne(@Param("idMonAn") idMonAn: number, @Param("idLoaiMonAn") idLoaiMonAn: number): Promise<Category_ProductResponseDto>{
        const category_product = await this.category_productService.findOne(idMonAn, idLoaiMonAn);
        return category_product
    }

    @Post()
    async create(@Body() createCateGory_ProductDto: CreateCateGory_ProductDto){
        const category_product = await this.category_productService.create(createCateGory_ProductDto);
        return category_product;
    }

    @Delete(":idMonAn/:idLoaiMonAn")
    async delete(@Param("idMonAn") idMonAn: number, @Param("idLoaiMonAn") idLoaiMonAn: number): Promise<void>{
        await this.category_productService.delete(idMonAn, idLoaiMonAn);
    }

}