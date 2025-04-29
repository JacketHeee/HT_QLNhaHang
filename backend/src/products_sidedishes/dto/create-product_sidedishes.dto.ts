import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSideDish_ProductDto {
    @IsNumber()
    @IsNotEmpty()
    IDMonAn: number;

    @IsNumber()
    @IsNotEmpty()
    IDMonAnKem: number;
}