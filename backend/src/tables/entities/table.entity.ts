import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'boolean',
        default: 'true'
    })
    isEmpty: boolean;

    @Column({default: false})
    isDeleted: boolean;

    @OneToMany(() => Order, listOD => listOD.table)
    listOD: Order[];

}