import { Category } from 'src/categories/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

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

    @Column()
    IDLoaiMonAn: number;

    @Column({
        type: 'boolean',
        default: false, // Đặt giá trị mặc định là false
    })
    isDeleted: boolean;

    @ManyToOne(() => Category, (category)=>category.products)
    @JoinColumn({name: 'IDLoaiMonAn'})
    category: Category

}