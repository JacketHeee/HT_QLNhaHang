import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Feature } from '../../features/entities/feature.entity';

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

  @ManyToMany(() => Feature, feature => feature.roles)
  @JoinTable({
    name: 'feature_roles',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'featureId', referencedColumnName: 'id' },
  })
  features: Feature[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 