import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    create(order: Partial<Order>, items: Partial<OrderItem>[]): Promise<Order>;
    updateStatus(id: string, status: string): Promise<Order>;
}
