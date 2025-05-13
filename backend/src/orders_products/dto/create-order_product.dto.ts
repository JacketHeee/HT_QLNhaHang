import { IsNumber, IsString } from "class-validator";

export class CreateOrder_ProductDto{
    @IsNumber()
    orderId: number;
        
    @IsNumber()
    productId: number;
        
    @IsNumber()
    quantity: number;
        
    @IsString()
    sideDishes?: string;
}