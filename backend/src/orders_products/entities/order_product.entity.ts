import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order_Product {
  // @PrimaryGeneratedColumn()
  // id: number;

  // // @ManyToOne(() => Order, order => order.orderItems)
  // // @JoinColumn({ name: 'orderId' })
  // order: Order;

  // @Column()
  // orderId: number;

  // // @ManyToOne(() => Product)
  // // @JoinColumn({ name: 'productId' })
  // product: Product;

  // @Column()
  // productId: number;

  // @Column()
  // quantity: number;

  // @Column('decimal')
  // price: number;

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  sideDishes: string;

  @Column({ default: false })
  isDeleted: boolean;
}
