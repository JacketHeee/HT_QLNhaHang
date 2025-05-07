import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryResponseDto } from "./dto/response-category.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";

@Controller("categories")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Get()
    @Roles('monan', 'donhang')
    async findAll(): Promise<CategoryResponseDto[]>{
        const categories = await this.categoryService.findAll();
        return categories;
    }

    @Get(":id")
    @Roles('monan', 'donhang')
    async findOne(@Param('id') id: number): Promise<CategoryResponseDto>{
        const category = await this.categoryService.findOne(id);
        return category;
    }

    @Get(":id/products")
    @Roles('monan', 'donhang')
    async getProducts(@Param('id') id: number){
        const products = this.categoryService.getProductsByCategoryID(id);
        return products;
    }

    @Post()
    @Roles('monan', 'donhang')
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto>{
        const category = await this.categoryService.create(createCategoryDto);
        return category;
    }

    @Put(":id")
    @Roles('monan', 'donhang')
    async update(@Param("id") id: number, @Body() updateCategoryDto): Promise<CategoryResponseDto>{
        const category = await this.categoryService.update(id, updateCategoryDto);
        return category;
    }

    @Delete(":id")
    @Roles('monan', 'donhang')
    async delete(@Param("id") id: number){
        this.categoryService.delete(id)
    }

}