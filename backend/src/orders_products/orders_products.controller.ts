import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersProductsService } from './orders_products.service';
import { CreateOrder_ProductDto } from './dto/create-order_product.dto';
import { UpdateOrder_ProductDto } from './dto/update-order_product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('orders-products')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OrdersProductsController {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @Get()
  @Roles('donhang')
  findAll() {
    return this.ordersProductsService.findAll();
  }

  @Get(':orderId/:productId')
  @Roles('donhang')
  findOne(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersProductsService.findOne(+orderId, +productId);
  }

  @Post()
  @Roles('donhang')
  create(@Body() createOrder_ProductDto: CreateOrder_ProductDto) {
    return this.ordersProductsService.create(createOrder_ProductDto);
  }

  @Delete(':orderId/:productId')
  @Roles('donhang')
  delete(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersProductsService.delete(+orderId, +productId);
  }
}
