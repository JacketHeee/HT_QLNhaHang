import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { PermissionsModule } from 'src/guards/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Table]),
      PermissionsModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
