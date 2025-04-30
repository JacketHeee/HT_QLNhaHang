import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
    @IsNumber()
    @IsOptional()
    customerId: number;
        
    @IsNumber()
    @IsOptional()
    tableId: number;
        
    @IsString()
    @IsOptional()
    note: string;
        
    @IsString()
    @IsOptional()
    status: string;
        
    @IsNumber()
    @IsOptional()
    totalPrice: number;
}