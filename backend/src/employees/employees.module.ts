import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { PermissionsModule } from 'src/guards/permission.module';

@Module({
    imports: [TypeOrmModule.forFeature([Employee]),
        PermissionsModule],
    controllers: [EmployeesController],
    providers: [EmployeesService],
})
export class EmployeesModule {}