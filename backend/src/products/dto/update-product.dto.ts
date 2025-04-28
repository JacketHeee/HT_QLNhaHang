import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    tenMonAn?: string;

    @IsString()
    @IsNotEmpty()
    moTa?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.01)
    @Max(100000000)
    giaBan?: number;

    @IsString()
    @IsNotEmpty()
    tenHinhAnh?: string;
}