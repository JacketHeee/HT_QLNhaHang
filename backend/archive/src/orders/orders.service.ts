import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
    ) {}

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find({ relations: ['orderItems'] });
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderItems'],
        });
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    async create(orderData: Partial<Order>, items: Partial<OrderItem>[]): Promise<Order> {
        const order = this.ordersRepository.create(orderData);
        order.orderItems = items.map(item => this.orderItemsRepository.create(item));
        order.totalPrice = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return this.ordersRepository.save(order);
    }

    async updateStatus(id: number, status: string): Promise<Order> {
        const order = await this.findOne(id);
        order.status = status;
        return this.ordersRepository.save(order);
    }
}