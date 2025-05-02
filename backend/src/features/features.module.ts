import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { Feature } from './entities/feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feature]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [FeaturesService], // Export để các module khác có thể sử dụng service này
})
export class FeaturesModule {} 