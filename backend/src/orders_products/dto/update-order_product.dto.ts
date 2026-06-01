import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrder_ProductDto {
  @IsNumber()
  @IsOptional()
  orderId: number;

  @IsNumber()
  @IsOptional()
  productId: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  sideDishes: string;
}
