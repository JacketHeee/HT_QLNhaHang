import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CategoryResponseDto } from "./dto/response-category.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService { 
    constructor(
        @InjectRepository(Category)
        private categoriesReposistory: Repository<Category>
    ){}

    async findAll(): Promise<CategoryResponseDto[]>{
        const categorys = await this.categoriesReposistory.find({
            where: {isDeleted: false},
        });
        return categorys.map(category => {
            const {ID, tenLoaiMonAn} = category
            return {ID, tenLoaiMonAn}
        });
    }

    async findOne(ID: number): Promise<CategoryResponseDto>{
        const category = await this.categoriesReposistory.findOneBy({ID});
        if(!category){
            throw new Error("Category not found");
        }
        const {ID: idCategory, tenLoaiMonAn} = category;
        return {ID: idCategory, tenLoaiMonAn}
    }

    async create(createCategory: CreateCategoryDto): Promise<CategoryResponseDto>{
        const category = this.categoriesReposistory.create(createCategory);
        const saveCategory = await this.categoriesReposistory.save(category);

        const {ID, tenLoaiMonAn} = saveCategory;
        return {ID, tenLoaiMonAn}
    }

    async update(ID: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto>{
        const category = await this.categoriesReposistory.findOneBy({ID});
        if(!category){
            throw new Error("Category not found");
        }

        Object.assign(category, updateCategoryDto);

        const updateCategory = await this.categoriesReposistory.save(category);
        const {ID: idCategory, tenLoaiMonAn} = updateCategory

        return {ID: idCategory, tenLoaiMonAn}
    }

    async delete(ID: number): Promise<void>{
        const category = await this.categoriesReposistory.findOneBy({ID});
        if(!category){
            throw new Error ("Category not found");
        }
        category.isDeleted = true;
        await this.categoriesReposistory.save(category)
    }
}