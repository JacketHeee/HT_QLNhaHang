import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SideDish } from "./entities/sidedish.entity";
import { SideDishService } from "./sidedish.service";
import { SideDishController } from "./sidedish.controller";
import { PermissionsModule } from "src/guards/permission.module";

@Module({
    imports: [TypeOrmModule.forFeature([SideDish]),
        PermissionsModule],
    controllers: [SideDishController],
    providers: [SideDishService]
})
export class SideDishModule {}