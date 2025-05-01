import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity() 
export class Product {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    tenMonAn: string;

    @Column()
    moTa: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    giaBan: number;

    @Column()
    tenHinhAnh: string;

    @Column({
        type: 'boolean',
        default: false, // Đặt giá trị mặc định là false
    })
    isDelete: boolean;



}