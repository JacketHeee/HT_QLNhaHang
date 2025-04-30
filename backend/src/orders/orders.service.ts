import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Order_Product } from '../orders_products/entities/order_product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  // constructor(
  //     @InjectRepository(Order)
  //     private ordersRepository: Repository<Order>,
  //     @InjectRepository(OrderItem)
  //     private orderItemsRepository: Repository<OrderItem>,
  // ) {}

  // async findAll(): Promise<Order[]> {
  //     return this.ordersRepository.find({ relations: ['orderItems'] });
  // }

  // async findOne(id: number): Promise<Order> {
  //     const order = await this.ordersRepository.findOne({
  //         where: { id },
  //         relations: ['orderItems'],
  //     });
  //     if (!order) {
  //         throw new Error('Order not found');
  //     }
  //     return order;
  // }

  // async create(orderData: Partial<Order>, items: Partial<OrderItem>[]): Promise<Order> {
  //     const order = this.ordersRepository.create(orderData);
  //     order.orderItems = items.map(item => this.orderItemsRepository.create(item));
  //     order.totalPrice = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //     return this.ordersRepository.save(order);
  // }

  // async updateStatus(id: number, status: string): Promise<Order> {
  //     const order = await this.findOne(id);
  //     order.status = status;
  //     return this.ordersRepository.save(order);
  // }

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order || order.isDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return {
      id: order.id,
      customerId: order.customerId,
      tableId: order.tableId,
      note: order.note,
      createdAt: order.createdAt,
      status: order.status,
      totalPrice: order.totalPrice,
    };
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    order.createdAt = new Date();
    await this.orderRepository.save(order);
    return {
      id: order.id,
      customerId: order.customerId,
      tableId: order.tableId,
      note: order.note,
      createdAt: order.createdAt,
      status: order.status,
      totalPrice: order.totalPrice,
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let order = await this.orderRepository.findOneBy({ id });
    if (!order || order.isDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    await this.orderRepository.update(id, updateOrderDto);
    order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return {
      id: order.id,
      customerId: order.customerId,
      tableId: order.tableId,
      note: order.note,
      createdAt: order.createdAt,
      status: order.status,
      totalPrice: order.totalPrice,
    };
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order || order.isDeleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    order.isDeleted = true;
    await this.orderRepository.save(order);
    return {
      id: order.id,
      customerId: order.customerId,
      tableId: order.tableId,
      note: order.note,
      createdAt: order.createdAt,
      status: order.status,
      totalPrice: order.totalPrice,
    };
  }
}
