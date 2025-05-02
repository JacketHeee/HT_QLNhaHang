import { Category } from 'src/categories/entities/category.entity';
import { SideDish_Product } from 'src/products_sidedishes/entities/product_sidedishes.entity';
import { SideDish } from 'src/sidedishes/entities/sidedish.entity';
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
    isDelete: boolean;

    @Column({
        type: 'boolean',
        default: false
    })
    isLocked: boolean;

    @ManyToOne(() => Category, (category)=>category.products)
    @JoinColumn({name: 'IDLoaiMonAn'})
    category: Category

    @OneToMany(() => SideDish_Product, (SD)=>SD.product)
    SDList: SideDish_Product[]

}