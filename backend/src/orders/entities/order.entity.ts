import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.orders)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column()
    customerId: number;

    @Column({ default: 'pending' })
    status: string;

    @Column('decimal', { default: 0 })
    totalPrice: number;

    @Column({ default: false })
    isTakeAway: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    orderItems: OrderItem[];
}