import { IsNumber, IsString } from "class-validator";

export class SideDishResponseDto{
    @IsNumber()
    ID: number

    @IsString()
    tenMonAnKem: string

    @IsNumber()
    price: number
}