import { Order } from '../../orders/entities/order.entity';
export declare class Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
}
