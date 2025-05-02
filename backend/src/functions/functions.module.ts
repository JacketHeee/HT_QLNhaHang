import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionsController } from './functions.controller';
import { FunctionsService } from './functions.service';
import { Function } from './entities/function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Function])],
  controllers: [FunctionsController],
  providers: [FunctionsService],
  exports: [FunctionsService],
})
export class FunctionsModule {} 