import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('features')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @Roles('admin')
  create(@Body() createFeatureDto: CreateFeatureDto): Promise<Feature> {
    return this.featuresService.create(createFeatureDto);
  }

  @Get()
  @Roles('admin')
  findAll(): Promise<Feature[]> {
    return this.featuresService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string): Promise<Feature> {
    return this.featuresService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
    return this.featuresService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    return this.featuresService.remove(+id);
  }
}