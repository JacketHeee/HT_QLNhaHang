import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    passWord: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    IDQuyen: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    IDNhanVien: number;
} 