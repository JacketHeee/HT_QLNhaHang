import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SideDish } from "./entities/sidedish.entity";
import { SideDishService } from "./sidedish.service";
import { SideDishController } from "./sidedish.controller";

@Module({
    imports: [TypeOrmModule.forFeature([SideDish])],
    controllers: [SideDishController],
    providers: [SideDishService]
})
export class SideDishModule {}