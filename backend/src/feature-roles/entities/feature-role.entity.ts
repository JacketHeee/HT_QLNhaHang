import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Feature } from '../../features/entities/feature.entity';

@Entity('feature_roles')
export class FeatureRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  featureId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Feature)
  @JoinColumn({ name: 'featureId' })
  feature: Feature;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 