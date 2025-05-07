import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
// import { RolesGuard } from '../guards/roles.guard';

// @UseGuards(RolesGuard)
@Controller('employees')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get()
    @Roles('nhanvien')
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Get(':id')
    @Roles('nhanvien')
    findOne(@Param('id') id: string): Promise<Employee> {
        return this.employeesService.findOne(+id);
    }

    @Get('/get/notHaveAccount')
    @Roles('nhanvien')
    async getAllEmployeeNotHaveAccount(): Promise<Employee[]>{
        const list = await this.employeesService.getEmployeeNotHaveAccount();
        return list;
    }

    @Post()
    @Roles('nhanvien')
    create(@Body() employee: Partial<Employee>): Promise<Employee> {
        return this.employeesService.create(employee);
    }

    @Put(':id')
    @Roles('nhanvien')
    update(@Param('id') id: string, @Body() employee: Partial<Employee>): Promise<Employee> {
        return this.employeesService.update(+id, employee);
    }

    @Put(':id/toggle-active')
    @Roles('nhanvien')
    toggleActive(@Param('id') id: string, @Body('isActive') isActive: boolean): Promise<Employee> {
        return this.employeesService.toggleActive(+id, isActive);
    }

    @Delete(':id')
    @Roles('nhanvien')
    remove(@Param('id') id: string): Promise<void> {
        return this.employeesService.remove(+id);
    }
}