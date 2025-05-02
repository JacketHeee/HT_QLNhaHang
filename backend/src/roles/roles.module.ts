import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { RoleFunctionsModule } from '../role_functions/role-functions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    RoleFunctionsModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {} 