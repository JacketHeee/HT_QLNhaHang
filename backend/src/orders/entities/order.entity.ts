import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Order_Product } from '../../orders_products/entities/order_product.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => Customer, customer => customer.orders)
    // @JoinColumn({ name: 'customerId' })
    // customer: Customer;

    @Column()
    customerId: number;

    @Column()
    tableId: number;

    @Column({default: ""})
    note: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 'pending' })
    status: string;

    @Column('decimal')
    totalPrice: number;

    @Column({default: false})
    isDeleted: boolean;

    // @Column({ default: false })
    // isTakeAway: boolean;

    // @UpdateDateColumn()
    // updatedAt: Date;

    // @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    // orderItems: OrderItem[];
}