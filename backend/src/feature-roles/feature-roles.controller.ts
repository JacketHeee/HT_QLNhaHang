// import { Controller, Get, Post, Body, Delete, Param, UseGuards, Patch } from '@nestjs/common';
// import { FeatureRolesService } from './feature-roles.service';
// import { CreateFeatureRoleDto } from './dto/create-feature-role.dto';
// import { FeatureRole } from './entities/feature-role.entity';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../guards/roles.guard';
// import { Roles } from '../decorators/roles.decorator';

// @Controller('feature-roles')
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class FeatureRolesController {
//   constructor(private readonly featureRolesService: FeatureRolesService) {}

//   @Post()
//   @Roles('admin')
//   create(@Body() createFeatureRoleDto: CreateFeatureRoleDto): Promise<FeatureRole> {
//     return this.featureRolesService.create(createFeatureRoleDto);
//   }

//   @Get()
//   @Roles('admin')
//   findAll(): Promise<FeatureRole[]> {
//     return this.featureRolesService.findAll();
//   }

//   @Get('role/:roleId')
//   @Roles('admin')
//   findByRole(@Param('roleId') roleId: string): Promise<FeatureRole[]> {
//     return this.featureRolesService.findByRole(+roleId);
//   }

//   @Get('feature/:featureId')
//   @Roles('admin')
//   findByFeature(@Param('featureId') featureId: string): Promise<FeatureRole[]> {
//     return this.featureRolesService.findByFeature(+featureId);
//   }

//   @Delete(':id')
//   @Roles('admin')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.featureRolesService.remove(+id);
//   }

//   @Delete('role/:roleId/feature/:featureId')
//   @Roles('admin')
//   removeByRoleAndFeature(
//     @Param('roleId') roleId: string,
//     @Param('featureId') featureId: string,
//   ): Promise<void> {
//     return this.featureRolesService.removeByRoleAndFeature(+roleId, +featureId);
//   }

//   @Patch('role/:roleId/features')
//   @Roles('admin')
//   updateRoleFeatures(
//     @Param('roleId') roleId: string,
//     @Body() { featureIds }: { featureIds: number[] },
//   ): Promise<void> {
//     return this.featureRolesService.updateRoleFeatures(+roleId, featureIds);
//   }
// } 