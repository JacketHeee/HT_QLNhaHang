import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureRole } from "src/feature-roles/entities/feature-role.entity";
import { Feature } from "src/features/entities/feature.entity";
import { Role } from "src/roles/entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(FeatureRole)
    private readonly featureRoleRepository: Repository<FeatureRole>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async getFeatureNamesByRoleName(Name: string): Promise<string[]> {
    const featureRoles = await this.featureRoleRepository.find({
      where: { role: {name: Name} },
      relations: ['feature'],
    });
  
    return [...new Set(featureRoles.map(fr => fr.feature.code))];
  }
}