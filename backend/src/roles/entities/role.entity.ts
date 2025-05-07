import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Feature } from '../../features/entities/feature.entity';
import { FeatureRole } from 'src/feature-roles/entities/feature-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Account, account => account.role)
  accounts: Account[];

  @OneToMany(() => FeatureRole, listFR=>listFR.role)
  listFR: FeatureRole[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 