import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/roles/entities/role.entity';
import { Feature } from 'src/features/entities/feature.entity';
import { FeatureRole } from 'src/feature-roles/entities/feature-role.entity';

@Injectable()
export class FeatureRolesSeeder implements Seeder {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,

        @InjectRepository(Feature)
        private readonly featureRepository: Repository<Feature>,

        @InjectRepository(FeatureRole)
        private readonly featureRoleRepository: Repository<FeatureRole>,
    ) { }

    async seed(): Promise<any> {
        const allRoles = await this.roleRepository.find();
        const allFeatures = await this.featureRepository.find();

        const mappingData = [
            {
                roleName: 'admin',
                featureCodes: ['taikhoan', 'nhanvien', 'phanquyen', 'donhang', 'bep', 'monan', 'banan']
            },
            {
                roleName: 'bep',
                featureCodes: ['monan', 'bep']
            },
            {
                roleName: 'nhanvien',
                featureCodes: ['monan', 'banan', 'donhang']
            }
        ];

        interface frdata {
            roleId: number,
            featureId: number,
            isDeleted: boolean
        }
        const featureRolesData: frdata[] = [];
        for (const item of mappingData) {
            const role = allRoles.find(r => r.name.toLowerCase() === item.roleName.toLowerCase());

            if (!role) {
                console.warn(`⚠️ Không tìm thấy Quyền (Role): "${item.roleName}" trong database.`);
                continue;
            }

            for (const code of item.featureCodes) {
                const feature = allFeatures.find(f => f.code.toLowerCase() === code.toLowerCase());

                if (!feature) {
                    console.warn(`⚠️ Không tìm thấy Chức năng (Feature) có code: "${code}" áp dụng cho quyền "${item.roleName}".`);
                    continue;
                }

                featureRolesData.push({
                    roleId: role.id,
                    featureId: feature.id,
                    isDeleted: false
                });
            }
        }
        if (featureRolesData.length > 0) {
            return this.featureRoleRepository.save(featureRolesData);
        }
    }

    async drop(): Promise<any> {
        return this.featureRoleRepository.delete({});
    }
}