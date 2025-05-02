import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateRoleFunctionDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    IDChucNang: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    IDQuyen: number;
} 