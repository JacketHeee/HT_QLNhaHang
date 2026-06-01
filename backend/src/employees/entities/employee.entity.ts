import { Account } from 'src/accounts/entities/account.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column()
    // role: string; // e.g., 'admin', 'kitchen', 'clerk'

    // @Column()
    // username: string;

    // @Column()
    // password: string;


    @Column({
        type: 'integer',
        default: 0,
    })
    idAccount: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    gioiTinh: string;

    @Column()
    soDT: string

    @Column({
        type: 'boolean',
        default: false, // Đặt giá trị mặc định là false
    })
    isDelete: boolean;
    
}