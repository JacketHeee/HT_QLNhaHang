import { IsString, IsOptional } from 'class-validator';

export class UpdateFunctionDto {
    @IsString()
    @IsOptional()
    tenChucNang?: string;
} 