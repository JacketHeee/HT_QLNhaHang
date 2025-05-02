import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateAccountDto {
    @IsString()
    @IsOptional()
    userName?: string;

    @IsString()
    @IsOptional()
    passWord?: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    IDQuyen?: number;

    @IsNumber()
    @IsOptional()
    @Min(1)
    IDNhanVien?: number;
} 