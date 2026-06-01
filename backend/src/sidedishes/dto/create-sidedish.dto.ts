import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateSideDishDto {
    @IsString()
    @IsNotEmpty()
    tenMonAnKem: string;
}
