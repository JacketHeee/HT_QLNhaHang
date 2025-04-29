import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SideDish_Product } from "./entities/product_sidedishes.entity";
import { SideDish_ProductController } from "./product_sidedishes.controller";
import { SideDish_ProductService } from "./product_sidedishes.service";

@Module({
    imports: [TypeOrmModule.forFeature([SideDish_Product])],
    controllers: [SideDish_ProductController],
    providers: [SideDish_ProductService]
})
export class SideDish_ProductModule {}