import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get()
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.findOne(+id);
    }

    @Post()
    create(@Body() employee: Partial<Employee>): Promise<Employee> {
        return this.employeesService.create(employee);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() employee: Partial<Employee>): Promise<Employee> {
        return this.employeesService.update(+id, employee);
    }

    @Put(':id/toggle-active')
    toggleActive(@Param('id') id: string, @Body('isActive') isActive: boolean): Promise<Employee> {
        return this.employeesService.toggleActive(+id, isActive);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.employeesService.remove(+id);
    }
}