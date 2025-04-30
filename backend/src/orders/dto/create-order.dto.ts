import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateOrderDto {
    @IsNumber()
    customerId: number;
    
    @IsNumber()
    tableId: number;
    
    @IsString()
    @IsOptional()
    note: string;
    
    @IsString()
    @IsOptional()
    status: string;
    
    @IsNumber()
    totalPrice: number;
}