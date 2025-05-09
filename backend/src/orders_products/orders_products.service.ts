import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order_Product } from './entities/order_product.entity';
import { Repository } from 'typeorm';
import { CreateOrder_ProductDto } from './dto/create-order_product.dto';
import { UpdateOrder_ProductDto } from './dto/update-order_product.dto';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(Order_Product)
    private readonly order_productRepository: Repository<Order_Product>,
  ) {}

  findAll() {
    return this.order_productRepository.find({ 
      where: { isDeleted: false },
      relations: ['product']
    });
  }

  async findOne(orderId: number, productId: number) {
    const order_product = await this.order_productRepository.findOneBy({
      orderId,
      productId,
    });
    if (!order_product || order_product.isDeleted) {
      throw new NotFoundException(
        `Order and product with id ${orderId} and id ${productId} not found`,
      );
    }
    return {
      orderId: order_product.orderId,
      productId: order_product.productId,
      quantity: order_product.quantity,
      sideDishes: order_product.sideDishes,
    };
  }

  async getListOPByOrderId(orderId: number){
    const rs = this.order_productRepository.find({ 
      where: { isDeleted: false, orderId: orderId},
      relations: ['product']
    });
    return rs;
  }

  async create(createOrder_ProductDto: CreateOrder_ProductDto) {
    const order_product = this.order_productRepository.create(
      createOrder_ProductDto,
    );
    await this.order_productRepository.save(order_product);
    return {
      orderId: order_product.orderId,
      productId: order_product.productId,
      quantity: order_product.quantity,
      sideDishes: order_product.sideDishes,
    };
  }

  async delete(orderId: number, productId: number) {
    const order_product = await this.order_productRepository.findOneBy({
      orderId,
      productId,
    });
    if (!order_product || order_product.isDeleted) {
      throw new NotFoundException(
        `Order and product with id ${orderId} and id ${productId} not found`,
      );
    }
    order_product.isDeleted = true;
    await this.order_productRepository.save(order_product);
    return {
      orderId: order_product.orderId,
      productId: order_product.productId,
      quantity: order_product.quantity,
      sideDishes: order_product.sideDishes,
    };
  }
}
