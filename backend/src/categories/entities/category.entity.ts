import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    tenLoaiMonAn: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean;


}