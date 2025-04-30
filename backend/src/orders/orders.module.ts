import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Order_Product } from '../orders_products/entities/order_product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Order_Product])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}