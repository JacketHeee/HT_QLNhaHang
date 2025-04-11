import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>);
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    create(orderData: Partial<Order>, items: Partial<OrderItem>[]): Promise<Order>;
    updateStatus(id: number, status: string): Promise<Order>;
}
