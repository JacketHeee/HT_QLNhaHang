import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { Order_Product } from '../orders_products/entities/order_product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OrdersController {
  // constructor(private readonly ordersService: OrdersService) {}

  // @Get()
  // findAll(): Promise<Order[]> {
  //     return this.ordersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Order> {
  //     return this.ordersService.findOne(+id);
  // }

  // @Post()
  // create(
  //     @Body('order') order: Partial<Order>,
  //     @Body('items') items: Partial<OrderItem>[],
  // ): Promise<Order> {
  //     return this.ordersService.create(order, items);
  // }

  // @Put(':id/status')
  // updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Order> {
  //     return this.ordersService.updateStatus(+id, status);
  // }

  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @Roles('donhang')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  @Roles('donhang')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post()
  @Roles('donhang')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Put('/:id')
  @Roles('donhang')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('/:id')
  @Roles('donhang')
  delete(@Param('id') id: string) {
    return this.orderService.delete(+id);
  }
}
