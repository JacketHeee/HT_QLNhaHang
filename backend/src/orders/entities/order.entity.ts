import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Order_Product } from '../../orders_products/entities/order_product.entity';
import { Table } from 'src/tables/entities/table.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Account } from 'src/accounts/entities/account.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tableId: number;

    @Column({default: ""})
    note: string;

    @CreateDateColumn()
    createdAt: Date; //tự động gán thời gian hiện tại

    @Column({ default: 'Chờ xác nhận' })
    status: string;

    @Column('decimal')
    totalPrice: number;

    @Column({default: false})
    isDeleted: boolean;

    @ManyToOne(() => Table, table => table.listOD, {eager: true})
    @JoinColumn({name : 'tableId'})
    table: Table;

    @ManyToOne(() => Account, account => account.listOD, { nullable:true})
    @JoinColumn({name : 'accountId'})
    account: Account;

    @OneToMany(() => Order_Product, listOP => listOP.order)
    listOP: Order_Product[]
}