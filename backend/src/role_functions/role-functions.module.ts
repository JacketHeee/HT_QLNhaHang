import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleFunctionsController } from './role-functions.controller';
import { RoleFunctionsService } from './role-functions.service';
import { RoleFunction } from './entities/role_function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleFunction])],
  controllers: [RoleFunctionsController],
  providers: [RoleFunctionsService],
  exports: [RoleFunctionsService],
})
export class RoleFunctionsModule {} 