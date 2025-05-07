import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SideDishService } from "./sidedish.service";
import { SideDishResponseDto } from "./dto/response-sidedish.dto";
import { CreateSideDishDto } from "./dto/create-sidedish.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";


@Controller("sidedishes")
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SideDishController {

    constructor(private sideDishService: SideDishService){}

    @Get()
    @Roles('monan', 'donhang')
    async findAll(): Promise<SideDishResponseDto[]>{
        const categories = await this.sideDishService.findAll();
        return categories;
    }

    @Get(":id")
    @Roles('monan', 'donhang')
    async findOne(@Param('id') id: number): Promise<SideDishResponseDto>{
        const SideDish = await this.sideDishService.findOne(id);
        return SideDish;
    }

    @Post()
    @Roles('monan', 'donhang')
    async create(@Body() createSideDishDto: CreateSideDishDto): Promise<SideDishResponseDto>{
        const SideDish = await this.sideDishService.create(createSideDishDto);
        return SideDish;
    }

    @Put(":id")
    @Roles('monan', 'donhang')
    async update(@Param("id") id: number, @Body() updateSideDishDto): Promise<SideDishResponseDto>{
        const SideDish = await this.sideDishService.update(id, updateSideDishDto);
        return SideDish;
    }

    @Delete(":id")
    @Roles('monan', 'donhang')
    async delete(@Param("id") id: number){
        this.sideDishService.delete(id)
    }

}