import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFunctionDto {
    @IsString()
    @IsNotEmpty()
    tenChucNang: string;
} 