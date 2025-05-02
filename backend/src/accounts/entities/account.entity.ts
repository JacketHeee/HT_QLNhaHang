import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    userName: string;

    @Column()
    passWord: string;

    @Column()
    IDQuyen: number;

    @Column()
    IDNhanVien: number;

    @Column({
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean;

    @ManyToOne(() => Role, (role) => role.accounts)
    @JoinColumn({ name: 'IDQuyen' })
    role: Role;

    @ManyToOne(() => Employee, (employee) => employee.accounts)
    @JoinColumn({ name: 'IDNhanVien' })
    employee: Employee;
} 