import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateRoleFunctionDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    IDChucNang?: number;

    @IsNumber()
    @IsOptional()
    @Min(1)
    IDQuyen?: number;
} 