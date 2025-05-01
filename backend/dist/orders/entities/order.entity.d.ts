import { OrderItem } from './order-item.entity';
import { Customer } from '../../customers/entities/customer.entity';
export declare class Order {
    id: number;
    customer: Customer;
    customerId: number;
    status: string;
    totalPrice: number;
    isTakeAway: boolean;
    createdAt: Date;
    updatedAt: Date;
    orderItems: OrderItem[];
}
