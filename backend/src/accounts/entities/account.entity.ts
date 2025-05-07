import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Role } from '../../roles/entities/role.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude() // Để loại trừ password khỏi response
  password: string;

  @Column({ default: true })// cho khóa
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({
  })
  employeeId: number;

  @Column({
  })
  roleId: number;

  @ManyToOne(() => Role, role => role.accounts, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'roleId'})
  role: Role;

  @OneToOne(() => Employee, { eager: true ,onDelete: 'CASCADE'})
  @JoinColumn({name: 'employeeId'})
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'boolean',
    default: false
  })
  isDeleted: boolean;

}
