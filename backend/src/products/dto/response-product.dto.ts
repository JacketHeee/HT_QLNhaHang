import { IsString, IsDecimal, IsNumber } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

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

    @IsString()
    category: Category;
}
