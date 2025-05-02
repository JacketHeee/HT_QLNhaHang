// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { FeatureRolesService } from './feature-roles.service';
// import { FeatureRolesController } from './feature-roles.controller';
// import { FeatureRole } from './entities/feature-role.entity';
// import { Role } from '../roles/entities/role.entity';
// import { Feature } from '../features/entities/feature.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([FeatureRole, Role, Feature]),
//   ],
//   controllers: [FeatureRolesController],
//   providers: [FeatureRolesService],
//   exports: [FeatureRolesService], // Export để các module khác có thể sử dụng service này
// })
// export class FeatureRolesModule {} 