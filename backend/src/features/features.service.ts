import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async findAll(): Promise<Feature[]> {
    return this.featureRepository.find();
  }

  async findOne(id: number): Promise<Feature> {
    const feature = await this.featureRepository.findOne({
      where: { id },
    });
    
    if (!feature) {
      throw new NotFoundException(`Chức năng với ID ${id} không tồn tại`);
    }
    
    return feature;
  }

  async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
    // Kiểm tra tên đã tồn tại chưa
    const existingFeatureByName = await this.featureRepository.findOne({
      where: { name: createFeatureDto.name },
    });
    
    if (existingFeatureByName) {
      throw new ConflictException(`Chức năng với tên ${createFeatureDto.name} đã tồn tại`);
    }
    
    // Kiểm tra code đã tồn tại chưa
    const existingFeatureByCode = await this.featureRepository.findOne({
      where: { code: createFeatureDto.code },
    });
    
    if (existingFeatureByCode) {
      throw new ConflictException(`Chức năng với mã ${createFeatureDto.code} đã tồn tại`);
    }
    
    const feature = this.featureRepository.create(createFeatureDto);
    return this.featureRepository.save(feature);
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
    const feature = await this.findOne(id);
    
    // Nếu có cập nhật tên, kiểm tra tên mới có trùng với feature khác không
    if (updateFeatureDto.name) {
      const existingFeature = await this.featureRepository.findOne({
        where: { name: updateFeatureDto.name },
      });
      
      if (existingFeature && existingFeature.id !== id) {
        throw new ConflictException(`Chức năng với tên ${updateFeatureDto.name} đã tồn tại`);
      }
    }
    
    // Nếu có cập nhật code, kiểm tra code mới có trùng với feature khác không
    if (updateFeatureDto.code) {
      const existingFeature = await this.featureRepository.findOne({
        where: { code: updateFeatureDto.code },
      });
      
      if (existingFeature && existingFeature.id !== id) {
        throw new ConflictException(`Chức năng với mã ${updateFeatureDto.code} đã tồn tại`);
      }
    }
    
    // Cập nhật thông tin
    Object.assign(feature, updateFeatureDto);
    
    return this.featureRepository.save(feature);
  }

  async remove(id: number): Promise<void> {
    const feature = await this.findOne(id);
    await this.featureRepository.remove(feature);
  }
} 