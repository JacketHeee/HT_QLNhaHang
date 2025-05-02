import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleFunction } from 'src/role_functions/entities/role_function.entity';

@Entity()
export class Function {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    tenChucNang: string;
    
    @Column({
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean;

    @OneToMany(() => RoleFunction, (roleFunction) => roleFunction.function)
    roleFunctions: RoleFunction[];
} 