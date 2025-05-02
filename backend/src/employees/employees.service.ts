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
        return this.employeesRepository.find({
            where: { isDeleted: false }
        });
    }

    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeesRepository.findOneBy({ ID: id, isDeleted: false });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }

    async findByUsername(username: string): Promise<Employee> {
        const employee = await this.employeesRepository.findOneBy({ tenNhanVien: username, isDeleted: false });
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

    async softDelete(id: number): Promise<Employee> {
        const employee = await this.findOne(id);
        employee.isDeleted = true;
        return this.employeesRepository.save(employee);
    }
}