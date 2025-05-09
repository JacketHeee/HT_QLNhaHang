import { SideDish_Product } from 'src/products_sidedishes/entities/product_sidedishes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity() 
export class SideDish {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    tenMonAnKem: string;

    @Column({
        type: 'boolean',
        default: false, 
    })
    isDeleted: boolean;

    @Column({
        type: 'decimal',
        default: 5000,
    })
    price: number;

    @OneToMany(() => SideDish_Product, (SD)=>SD.sideDish)
    SDList: SideDish_Product[]
}