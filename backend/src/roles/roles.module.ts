import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // Export để các module khác có thể sử dụng service này
})
export class RolesModule {} 