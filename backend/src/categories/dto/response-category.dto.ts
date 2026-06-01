import { IsNumber, IsString } from "class-validator";

export class CategoryResponseDto{
    @IsNumber()
    ID: number

    @IsString()
    tenLoaiMonAn: string
}