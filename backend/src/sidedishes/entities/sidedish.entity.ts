import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}