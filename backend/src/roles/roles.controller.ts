import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { PermissionsGuard } from 'src/guards/roles.guard';

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
// @UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('phanquyen')
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('phanquyen')
  async findAll(): Promise<Role[]> {
    const list = await this.rolesService.findAll();
    return list;
  }

  @Get(':id')
  @Roles('phanquyen')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('phanquyen')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('phanquyen')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
} 