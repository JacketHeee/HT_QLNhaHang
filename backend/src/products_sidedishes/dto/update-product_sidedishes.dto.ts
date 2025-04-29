import { IsNotEmpty, IsNumber } from "class-validator";

export class updateSideDish_ProductsDto {
    @IsNumber()
    @IsNotEmpty()
    IDMonAn?: number;

    @IsNumber()
    @IsNotEmpty()
    IDMonAnKem?: number;
}