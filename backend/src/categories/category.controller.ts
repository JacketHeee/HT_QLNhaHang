import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryResponseDto } from "./dto/response-category.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("categories")
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Get()
    async findAll(): Promise<CategoryResponseDto[]>{
        const categories = await this.categoryService.findAll();
        return categories;
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<CategoryResponseDto>{
        const category = await this.categoryService.findOne(id);
        return category;
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto>{
        const category = await this.categoryService.create(createCategoryDto);
        return category;
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() updateCategoryDto): Promise<CategoryResponseDto>{
        const category = await this.categoryService.update(id, updateCategoryDto);
        return category;
    }

    @Delete(":id")
    async delete(@Param("id") id: number){
        this.categoryService.delete(id)
    }

}