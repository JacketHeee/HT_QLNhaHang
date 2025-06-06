import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
    ) {}

    async findAll(): Promise<Employee[]> {
        return this.employeesRepository.find();
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeesRepository.findOneBy({ id });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }

    async findByUsername(username: string): Promise<Employee> {
        const employee = await this.employeesRepository.findOneBy({ username });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }

    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeesRepository.create(employeeData);
        return this.employeesRepository.save(employee);
    }

    async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
        await this.employeesRepository.update(id, employeeData);
        return this.findOne(id);
    }

    async toggleActive(id: number, isActive: boolean): Promise<Employee> {
        const employee = await this.findOne(id);
        employee.isActive = isActive;
        return this.employeesRepository.save(employee);
    }

    async remove(id: number): Promise<void> {
        await this.employeesRepository.delete(id);
    }
}