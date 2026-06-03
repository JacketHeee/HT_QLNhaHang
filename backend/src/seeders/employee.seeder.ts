import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Employee } from 'src/employees/entities/employee.entity';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class EmployeesSeeder implements Seeder {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
    ) { }

    async seed(): Promise<any> {
        const employeesData = [
            {
                name: 'admin',
                soDT: '0999999999',
                gioiTinh: 'M',
                isDeleted: false,
            },
            {
                name: 'bep',
                soDT: '0999999999',
                gioiTinh: 'M',
                isDeleted: false,
            },
            {
                name: 'nhanvien',
                soDT: '0999999999',
                gioiTinh: 'M',
                isDeleted: false,
            },
        ];
        return this.employeeRepository.save(employeesData);
    }

    async drop(): Promise<any> {
        return this.employeeRepository.delete({});
    }
}