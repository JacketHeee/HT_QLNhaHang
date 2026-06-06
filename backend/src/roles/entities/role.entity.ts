import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Feature } from '../../features/entities/feature.entity';
import { FeatureRole } from 'src/feature-roles/entities/feature-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => Account, account => account.role)
  accounts: Account[];

  @OneToMany(() => FeatureRole, listFR=>listFR.role, { eager: true })
  listFR: FeatureRole[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 