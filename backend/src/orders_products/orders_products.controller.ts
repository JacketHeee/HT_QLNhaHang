import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { CreateOrder_ProductDto } from './dto/create-order_product.dto';
import { UpdateOrder_ProductDto } from './dto/update-order_product.dto';

@Controller('orders-products')
export class OrdersProductsController {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @Get()
  findAll() {
    return this.ordersProductsService.findAll();
  }

  @Get(':orderId/:productId')
  findOne(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersProductsService.findOne(+orderId, +productId);
  }

  @Post()
  create(@Body() createOrder_ProductDto: CreateOrder_ProductDto) {
    return this.ordersProductsService.create(createOrder_ProductDto);
  }

  @Delete(':orderId/:productId')
  delete(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersProductsService.delete(+orderId, +productId);
  }
}
