import { IsString, IsDecimal, IsNumber, IsBoolean } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { SideDish } from 'src/sidedishes/entities/sidedish.entity';

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

    @IsBoolean()
    isLocked: boolean;

    category: Category;
}
