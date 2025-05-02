import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SideDish_ProductService } from "./product_sidedishes.service";
import { SideDish_ProductResponseDto } from "./dto/response-product_sidedishes.dto";
import { CreateSideDish_ProductDto } from "./dto/create-product_sidedishes.dto";
import { SideDish } from "src/sidedishes/entities/sidedish.entity";

@Controller("sidedish_product")
export class SideDish_ProductController {

    constructor(private sideDish_productService: SideDish_ProductService){}

    @Get()
    async findAll(): Promise<SideDish_ProductResponseDto[]>{
        const sidedishes_products = await this.sideDish_productService.findAll();
        return sidedishes_products;
    }

    @Get(":idMonAn/:idLoaiMonAn")
    async findOne(@Param("idMonAn") idMonAn: number, @Param("idLoaiMonAn") idLoaiMonAn: number): Promise<SideDish_ProductResponseDto>{
        const SideDish_product = await this.sideDish_productService.findOne(idMonAn, idLoaiMonAn);
        return SideDish_product
    }

    @Get(":idMonAn/find/sidedish")
    async findAllSideDishByProductID(@Param("idMonAn") id: number){
        const listSD = await this.sideDish_productService.findAllSideDishByProductID(id);
        return listSD;
    }

    @Post()
    async create(@Body() createSideDish_ProductDto: CreateSideDish_ProductDto){
        const SideDish_product = await this.sideDish_productService.create(createSideDish_ProductDto);
        return SideDish_product;
    }

    @Delete(":idMonAn/:idLoaiMonAn")
    async delete(@Param("idMonAn") idMonAn: number, @Param("idLoaiMonAn") idLoaiMonAn: number): Promise<void>{
        await this.sideDish_productService.delete(idMonAn, idLoaiMonAn);
    }

}