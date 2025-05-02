import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Function } from 'src/functions/entities/function.entity';

@Entity()
export class RoleFunction {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    IDChucNang: number;

    @Column()
    IDQuyen: number;
    
    @Column({
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean;

    @ManyToOne(() => Function, (func) => func.roleFunctions)
    @JoinColumn({ name: 'IDChucNang' })
    function: Function;

    @ManyToOne(() => Role, (role) => role.roleFunctions)
    @JoinColumn({ name: 'IDQuyen' })
    role: Role;
} 