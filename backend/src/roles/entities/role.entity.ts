import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { RoleFunction } from 'src/role_functions/entities/role_function.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    tenQuyen: string;
    
    @Column({
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean;

    @OneToMany(() => Account, (account) => account.role)
    accounts: Account[];

    @OneToMany(() => RoleFunction, (roleFunction) => roleFunction.role)
    roleFunctions: RoleFunction[];
} 