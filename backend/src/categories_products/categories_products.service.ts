import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category_Product } from "./entities/categories_products.entity";
import { Repository } from "typeorm";
import { Category_ProductResponseDto } from "./dto/response-categories_products.dto";
import { CreateCateGory_ProductDto } from "./dto/create-categories_products.dto";

@Injectable()
export class Category_ProductService {
    constructor(
        @InjectRepository(Category_Product)
        private category_productReposistory: Repository<Category_Product>,
    ){}

    async findAll(): Promise<Category_ProductResponseDto[]>{
        const categories_products = await this.category_productReposistory.find({
            where: {isDeleted: false},
        });
        return categories_products.map(category_product =>{
            const {IDMonAn, IDLoaiMonAn} = category_product;
            return {IDMonAn, IDLoaiMonAn} ;
        });
    }

    async findOne(IDMA: number, IDLMA: number): Promise<Category_ProductResponseDto>{
        const category_product = await this.category_productReposistory.findOne({
            where: {IDMonAn: IDMA, IDLoaiMonAn: IDLMA}
        });
        if(!category_product){
            throw new Error("Category_Product not found");
        }
        const {IDMonAn, IDLoaiMonAn} = category_product;
        return {IDMonAn, IDLoaiMonAn};
    }

    async create(createCateGory_ProductDto: CreateCateGory_ProductDto): Promise<Category_ProductResponseDto>{
        const category_product = this.category_productReposistory.create(createCateGory_ProductDto);
        const savedcategory_product = await this.category_productReposistory.save(category_product);

        const {IDMonAn, IDLoaiMonAn} = savedcategory_product
        return {IDMonAn, IDLoaiMonAn}
    }

    async delete(IDMA: number, IDLMA: number): Promise<void>{
        const category_product = await this.category_productReposistory.findOne({
            where: {IDMonAn: IDLMA, IDLoaiMonAn: IDLMA}
        });
        if(!category_product){
            throw new Error("catefory_product not found");
        }
        category_product.isDeleted = true;
        this.category_productReposistory.save(category_product);
    }

}