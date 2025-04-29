import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category_Product } from "./entities/categories_products.entity";
import { Category_ProductController } from "./categories_products.controller";
import { Category_ProductService } from "./categories_products.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category_Product])],
    controllers: [Category_ProductController],
    providers: [Category_ProductService]
})
export class Category_ProductModule {}