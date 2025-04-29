import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SideDishService } from "./sidedish.service";
import { SideDishResponseDto } from "./dto/response-sidedish.dto";
import { CreateSideDishDto } from "./dto/create-sidedish.dto";


@Controller("sidedishes")
export class SideDishController {

    constructor(private sideDishService: SideDishService){}

    @Get()
    async findAll(): Promise<SideDishResponseDto[]>{
        const categories = await this.sideDishService.findAll();
        return categories;
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<SideDishResponseDto>{
        const SideDish = await this.sideDishService.findOne(id);
        return SideDish;
    }

    @Post()
    async create(@Body() createSideDishDto: CreateSideDishDto): Promise<SideDishResponseDto>{
        const SideDish = await this.sideDishService.create(createSideDishDto);
        return SideDish;
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() updateSideDishDto): Promise<SideDishResponseDto>{
        const SideDish = await this.sideDishService.update(id, updateSideDishDto);
        return SideDish;
    }

    @Delete(":id")
    async delete(@Param("id") id: number){
        this.sideDishService.delete(id)
    }

}