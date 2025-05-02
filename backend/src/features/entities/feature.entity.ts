// import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { Role } from '../../roles/entities/role.entity';

// @Entity()
// export class Feature {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   name: string;

//   @Column({ unique: true })
//   code: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column({ default: true })
//   isActive: boolean;

//   // @ManyToMany(() => Role, role => role.features)
//   // roles: Role[];

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// } 