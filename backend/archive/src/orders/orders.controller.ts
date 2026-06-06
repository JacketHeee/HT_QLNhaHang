import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOne(+id);
    }

    @Post()
    create(
        @Body('order') order: Partial<Order>,
        @Body('items') items: Partial<OrderItem>[],
    ): Promise<Order> {
        return this.ordersService.create(order, items);
    }

    @Put(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Order> {
        return this.ordersService.updateStatus(+id, status);
    }
}