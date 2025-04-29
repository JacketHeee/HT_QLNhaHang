import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SideDish } from "./entities/sidedish.entity";
import { SideDishResponseDto } from "./dto/response-sidedish.dto";
import { CreateSideDishDto } from "./dto/create-sidedish.dto";
import { UpdateSideDishDto } from "./dto/update-sidedish.dto";

@Injectable()
export class SideDishService { 
    constructor(
        @InjectRepository(SideDish)
        private sidedishesReposistory: Repository<SideDish>
    ){}

    async findAll(): Promise<SideDishResponseDto[]>{
        const SideDishs = await this.sidedishesReposistory.find({
            where: {isDeleted: false},
        });
        return SideDishs.map(SideDish => {
            const {ID, tenMonAnKem} = SideDish
            return {ID, tenMonAnKem}
        });
    }

    async findOne(ID: number): Promise<SideDishResponseDto>{
        const SideDish = await this.sidedishesReposistory.findOneBy({ID});
        if(!SideDish){
            throw new Error("SideDish not found");
        }
        const {ID: idSideDish, tenMonAnKem} = SideDish;
        return {ID: idSideDish, tenMonAnKem}
    }

    async create(createSideDish: CreateSideDishDto): Promise<SideDishResponseDto>{
        const SideDish = this.sidedishesReposistory.create(createSideDish);
        const saveSideDish = await this.sidedishesReposistory.save(SideDish);

        const {ID, tenMonAnKem} = saveSideDish;
        return {ID, tenMonAnKem}
    }

    async update(ID: number, updateSideDishDto: UpdateSideDishDto): Promise<SideDishResponseDto>{
        const SideDish = await this.sidedishesReposistory.findOneBy({ID});
        if(!SideDish){
            throw new Error("SideDish not found");
        }

        Object.assign(SideDish, updateSideDishDto);

        const updateSideDish = await this.sidedishesReposistory.save(SideDish);
        const {ID: idSideDish, tenMonAnKem} = updateSideDish

        return {ID: idSideDish, tenMonAnKem}
    }

    async delete(ID: number): Promise<void>{
        const SideDish = await this.sidedishesReposistory.findOneBy({ID});
        if(!SideDish){
            throw new Error ("SideDish not found");
        }
        SideDish.isDeleted = true;
        await this.sidedishesReposistory.save(SideDish)
    }
}