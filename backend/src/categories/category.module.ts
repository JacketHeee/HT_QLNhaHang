import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { PermissionsModule } from "src/guards/permission.module";

@Module({
    imports: [TypeOrmModule.forFeature([Category]),
        PermissionsModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
