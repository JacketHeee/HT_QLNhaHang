import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Category_Product {
    @PrimaryColumn()
    IDMonAn: number;

    @PrimaryColumn()
    IDLoaiMonAn: number;

    @Column({
        type: 'boolean',
        default: false
    })
    isDeleted: boolean
}