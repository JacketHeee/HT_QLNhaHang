import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCateGory_ProductDto {
    @IsNumber()
    @IsNotEmpty()
    IDMonAn: number;

    @IsNumber()
    @IsNotEmpty()
    IDLoaiMonAn: number;
}