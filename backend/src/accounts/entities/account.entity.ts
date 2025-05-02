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

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @ManyToOne(() => Role, role => role.accounts)
  role: Role;

  @OneToOne(() => Employee, { eager: true })
  @JoinColumn()
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
