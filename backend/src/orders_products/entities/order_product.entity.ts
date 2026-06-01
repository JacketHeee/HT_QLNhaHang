import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
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

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number; //số lượng

  @Column({ default: "" })
  sideDishes: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Order, order => order.listOP)
  @JoinColumn({name:'orderId'})
  order: Order;
  
  @ManyToOne(() => Product, product => product.listOP)
  @JoinColumn({name:'productId'})
  product: Product;
}
