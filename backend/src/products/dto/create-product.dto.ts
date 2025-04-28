import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    tenMonAn: string;

    @IsString()
    @IsNotEmpty()
    moTa: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.01)
    @Max(100000000)
    giaBan: number;

    @IsString()
    @IsNotEmpty()
    tenHinhAnh: string;
}
