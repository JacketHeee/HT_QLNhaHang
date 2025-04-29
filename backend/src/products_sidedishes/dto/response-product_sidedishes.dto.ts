import { IsNumber } from "class-validator";

export class SideDish_ProductResponseDto {
    @IsNumber()
    IDMonAn: number;

    @IsNumber()
    IDMonAnKem: number;
}