import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: false})
    isDeleted: boolean;
}