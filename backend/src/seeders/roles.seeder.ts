import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/roles/entities/role.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { FeatureRole } from 'src/feature-roles/entities/feature-role.entity';

@Injectable()
export class RolesSeeder implements Seeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(FeatureRole)
    private readonly featureRoleRepository: Repository<FeatureRole>,
  ) {}

  async seed(): Promise<any> {
    const rolesData = [
      { name: 'admin', description: 'you can do anything you want', isDeledted: false },
      { name: 'bep', description: 'you can cook', isDeledted: false },
      { name: 'nhanvien', description: 'you can ban hang', isDeledted: false }
    ];

    return this.roleRepository.save(rolesData);
  }

  async drop(): Promise<any> {
    await this.accountRepository.delete({});
    await this.featureRoleRepository.delete({});
    return this.roleRepository.delete({});
  }
}