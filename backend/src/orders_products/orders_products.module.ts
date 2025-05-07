import { Module } from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { OrdersProductsController } from './orders_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order_Product } from './entities/order_product.entity';
import { PermissionsModule } from 'src/guards/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order_Product]),
      PermissionsModule],
  controllers: [OrdersProductsController],
  providers: [OrdersProductsService],
})
export class OrdersProductsModule {}
