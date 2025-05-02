import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { RoleFunctionsModule } from '../role_functions/role-functions.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee]),
        RoleFunctionsModule
    ],
    controllers: [EmployeesController],
    providers: [EmployeesService],
    exports: [EmployeesService]
})
export class EmployeesModule {}