import { Product } from "src/products/entities/product.entity";
import { SideDish } from "src/sidedishes/entities/sidedish.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class SideDish_Product {
    @PrimaryColumn()
    IDMonAn: number;

    @PrimaryColumn()
    IDMonAnKem: number;

    @Column({
        type: 'boolean',
        default: false
    })
    isDeleted: boolean

    @ManyToOne(() => Product, (product) => product.SDList)
    @JoinColumn({name: 'IDMonAn'})
    product: Product

    @ManyToOne(() => SideDish, (sidedish) => sidedish.SDList)
    @JoinColumn({name: 'IDMonAnKem'})
    sideDish: SideDish

}