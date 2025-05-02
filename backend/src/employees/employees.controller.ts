import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get()
    @Roles('Admin', 'Manager')
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Get(':id')
    @Roles('Admin', 'Manager')
    findOne(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.findOne(+id);
    }

    @Post()
    @Roles('Admin')
    create(@Body() employee: Partial<Employee>): Promise<Employee> {
        return this.employeesService.create(employee);
    }

    @Put(':id')
    @Roles('Admin')
    update(@Param('id') id: string, @Body() employee: Partial<Employee>): Promise<Employee> {
        return this.employeesService.update(+id, employee);
    }

    @Delete(':id')
    @Roles('Admin')
    remove(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.softDelete(+id);
    }
}