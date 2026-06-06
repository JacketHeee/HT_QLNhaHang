import { Controller, Get, Post, Body, Delete, Param, UseGuards, Patch } from '@nestjs/common';
import { FeatureRolesService } from './feature-roles.service';
import { CreateFeatureRoleDto } from './dto/create-feature-role.dto';
import { FeatureRole } from './entities/feature-role.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { PermissionsGuard } from 'src/guards/roles.guard';

@Controller('feature-roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
// @UseGuards(JwtAuthGuard, RolesGuard)
export class FeatureRolesController {
  constructor(private readonly featureRolesService: FeatureRolesService) {}

  @Post()
  @Roles('phanquyen')
  create(@Body() createFeatureRoleDto: CreateFeatureRoleDto): Promise<FeatureRole> {
    return this.featureRolesService.create(createFeatureRoleDto);
  }

  @Get()
  @Roles('phanquyen')
  findAll(): Promise<FeatureRole[]> {
    return this.featureRolesService.findAll();
  }

  @Get('role/:roleId')
  @Roles('phanquyen')
  findByRole(@Param('roleId') roleId: string): Promise<FeatureRole[]> {``
    return this.featureRolesService.findByRole(+roleId);
  }

  @Get('feature/:featureId')
  @Roles('phanquyen')
  findByFeature(@Param('featureId') featureId: string): Promise<FeatureRole[]> {
    return this.featureRolesService.findByFeature(+featureId);
  }

  @Get('findfeature/:roleName')
  async getFeatureCodeByRoleName(@Param('roleName') roleName: string): Promise<String[]>{
    const features = await this.featureRolesService.getFeatureNamesByRoleName(roleName)
    return features;
  }

  @Delete(':id')
  @Roles('phanquyen')
  remove(@Param('id') id: string): Promise<void> {
    return this.featureRolesService.remove(+id);
  }

  @Delete('role/:roleId/feature/:featureId')
  @Roles('phanquyen')
  removeByRoleAndFeature(
    @Param('roleId') roleId: string,
    @Param('featureId') featureId: string,
  ): Promise<void> {
    return this.featureRolesService.removeByRoleAndFeature(+roleId, +featureId);
  }

  @Patch('role/:roleId/features')
  @Roles('phanquyen')
  updateRoleFeatures(
    @Param('roleId') roleId: string,
    @Body() { featureIds }: { featureIds: number[] },
  ): Promise<void> {
    return this.featureRolesService.updateRoleFeatures(+roleId, featureIds);
  }
} 