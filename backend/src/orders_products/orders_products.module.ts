import { Module } from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { OrdersProductsController } from './orders_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order_Product } from './entities/order_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order_Product])],
  controllers: [OrdersProductsController],
  providers: [OrdersProductsService],
})
export class OrdersProductsModule {}
