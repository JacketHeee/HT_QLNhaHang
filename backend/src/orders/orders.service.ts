import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Order_Product } from '../orders_products/entities/order_product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async findAll() {
    const rs = await this.orderRepository.find({
      where: { isDeleted: false },
      relations: ['listOP']
    });
    return rs;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['listOP'],
    });
    if (!order || order.isDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    order.createdAt = new Date();
    await this.orderRepository.save(order);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({ id });
    if (!order || order.isDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    Object.assign(order, updateOrderDto);
    await this.orderRepository.save(order);
    return order;
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order || order.isDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    order.isDeleted = true;
    await this.orderRepository.save(order);
  }
}
