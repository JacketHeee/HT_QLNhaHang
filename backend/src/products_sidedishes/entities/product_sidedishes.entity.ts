import { Column, Entity, PrimaryColumn } from "typeorm";

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
}