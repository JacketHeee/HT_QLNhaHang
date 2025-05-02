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

    @OneToMany(() => SideDish_Product, (SD)=>SD.sideDish)
    SDList: SideDish_Product[]
}