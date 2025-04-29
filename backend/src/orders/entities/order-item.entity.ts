import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Order, order => order.orderItems)
    // @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    orderId: number;

    // @ManyToOne(() => Product)
    // @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column('decimal')
    price: number;
}