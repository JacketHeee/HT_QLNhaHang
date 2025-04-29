import { IsNumber } from "class-validator";

export class Category_ProductResponseDto {
    @IsNumber()
    IDMonAn: number;

    @IsNumber()
    IDLoaiMonAn: number;
}