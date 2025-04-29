import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SideDish_Product } from "./entities/product_sidedishes.entity";
import { SideDish_ProductResponseDto } from "./dto/response-product_sidedishes.dto";
import { CreateSideDish_ProductDto } from "./dto/create-product_sidedishes.dto";


@Injectable()
export class SideDish_ProductService {
    constructor(
        @InjectRepository(SideDish_Product)
        private SideDish_ProductReposistory: Repository<SideDish_Product>,
    ){}

    async findAll(): Promise<SideDish_ProductResponseDto[]>{
        const dishes_products = await this.SideDish_ProductReposistory.find({
            where: {isDeleted: false},
        });
        return dishes_products.map(sidedish_product =>{
            const {IDMonAn, IDMonAnKem} = sidedish_product;
            return {IDMonAn, IDMonAnKem} ;
        });
    }

    async findOne(IDMA: number, IDMAK: number): Promise<SideDish_ProductResponseDto>{
        const SideDish_Product = await this.SideDish_ProductReposistory.findOne({
            where: {IDMonAn: IDMA, IDMonAnKem: IDMAK}
        });
        if(!SideDish_Product){
            throw new Error("SideDish_Product not found");
        }
        const {IDMonAn, IDMonAnKem} = SideDish_Product;
        return {IDMonAn, IDMonAnKem};
    }

    async create(createSideDish_ProductDto: CreateSideDish_ProductDto): Promise<SideDish_ProductResponseDto>{
        const sidedish_product = this.SideDish_ProductReposistory.create(createSideDish_ProductDto);
        const savedsidedish_product = await this.SideDish_ProductReposistory.save(sidedish_product);

        const {IDMonAn, IDMonAnKem} = savedsidedish_product
        return {IDMonAn, IDMonAnKem}
    }

    async delete(IDMA: number, IDMAK: number): Promise<void>{
        const sidedish_product = await this.SideDish_ProductReposistory.findOne({
            where: {IDMonAn: IDMAK, IDMonAnKem: IDMAK}
        });
        if(!sidedish_product){
            throw new Error("sidedish_product not found");
        }
        sidedish_product.isDeleted = true;
        this.SideDish_ProductReposistory.save(sidedish_product);
    }

}