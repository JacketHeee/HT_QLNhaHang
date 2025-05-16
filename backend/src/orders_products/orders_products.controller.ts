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

@Controller('orders_products')
export class OrdersProductsController {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
   @Roles('donhang', 'bep')
  findAll() {
    return this.ordersProductsService.findAll();
  }

  @Get(':orderId/:productId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
   @Roles('donhang', 'bep')
  findOne(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersProductsService.findOne(+orderId, +productId);
  }

  @Get('get/listOP/:orderId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
   @Roles('donhang', 'bep')
  getListOPByOrderId(
    @Param('orderId') orderId: string,
  ) {
    return this.ordersProductsService.getListOPByOrderId(+orderId);
  }

  @Post()
  @UseGuards()
  create(@Body() createOrder_ProductDto: CreateOrder_ProductDto) {
    return this.ordersProductsService.create(createOrder_ProductDto);
  }

  
  @Delete(':orderId/:productId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
   @Roles('donhang', 'bep')
  delete(
    @Param('orderId') orderId: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersProductsService.delete(+orderId, +productId);
  }
}
