import { IsString, IsDecimal, IsNumber } from 'class-validator';

export class ProductResponseDto {
    @IsNumber()
    ID: number;

    @IsString()
    tenMonAn: string;

    @IsString()
    moTa: string;

    @IsDecimal()
    giaBan: number;

    @IsString()
    tenHinhAnh: string;
}
