import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SideDish_ProductService } from "./product_sidedishes.service";
import { SideDish_ProductResponseDto } from "./dto/response-product_sidedishes.dto";
import { CreateSideDish_ProductDto } from "./dto/create-product_sidedishes.dto";
import { SideDish } from "src/sidedishes/entities/sidedish.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";

@Controller("sidedish_product")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SideDish_ProductController {

    constructor(private sideDish_productService: SideDish_ProductService){}

    @Get()
    @Roles('monan', 'donhang')
    async findAll(): Promise<SideDish_ProductResponseDto[]>{
        const sidedishes_products = await this.sideDish_productService.findAll();
        return sidedishes_products;
    }

    @Get(":idMonAn/:idLoaiMonAn")
    @Roles('monan', 'donhang')
    async findOne(@Param("idMonAn") idMonAn: number, @Param("idLoaiMonAn") idLoaiMonAn: number): Promise<SideDish_ProductResponseDto>{
        const SideDish_product = await this.sideDish_productService.findOne(idMonAn, idLoaiMonAn);
        return SideDish_product
    }

    @Get(":idMonAn/find/sidedish")
    @Roles('monan', 'donhang')
    async findAllSideDishByProductID(@Param("idMonAn") id: number){
        const listSD = await this.sideDish_productService.findAllSideDishByProductID(id);
        return listSD;
    }

    @Post()
    @Roles('monan', 'donhang')
    async create(@Body() createSideDish_ProductDto: CreateSideDish_ProductDto){
        const SideDish_product = await this.sideDish_productService.create(createSideDish_ProductDto);
        return SideDish_product;
    }

    @Delete(":idMonAn/:idLoaiMonAn")
    @Roles('monan', 'donhang')
    async delete(@Param("idMonAn") idMonAn: number, @Param("idLoaiMonAn") idLoaiMonAn: number): Promise<void>{
        await this.sideDish_productService.delete(idMonAn, idLoaiMonAn);
    }

}