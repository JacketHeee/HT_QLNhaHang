import { IsNotEmpty, IsNumber } from "class-validator";

export class updateCategory_ProductsDto {
    @IsNumber()
    @IsNotEmpty()
    IDMonAn?: number;

    @IsNumber()
    @IsNotEmpty()
    IDLoaiMonAn?: number;
}