import { FeatureRolesModule } from "src/feature-roles/feature-roles.module";
import { PermissionsGuard } from "./roles.guard";
import { Module } from "@nestjs/common";
import { FeatureRole } from "src/feature-roles/entities/feature-role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/roles/entities/role.entity";
import { Feature } from "src/features/entities/feature.entity";
import { PermissionService } from "./permission.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FeatureRole, Role, Feature]),
    ],// cung cấp repos cho guard truy suất
    providers: [PermissionsGuard, PermissionService],
    exports: [PermissionsGuard, PermissionService]
})
export class PermissionsModule{}