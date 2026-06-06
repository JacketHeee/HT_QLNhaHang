import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/accounts/entities/account.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class AccountsSeeder implements Seeder {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,

        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
    ) { }

    async seed(): Promise<any> {
        const adminRole = await this.roleRepository.findOne({ where: { name: 'admin' } });
        if (!adminRole) {
            console.error('Không tìm thấy quyền admin. Hãy chắc chắn RolesSeeder đã chạy trước!');
            return;
        }
        const bepRole = await this.roleRepository.findOne({ where: { name: 'bep' } });
        if (!bepRole) {
            console.error('Không tìm thấy quyền bep. Hãy chắc chắn RolesSeeder đã chạy trước!');
            return;
        }
        const nhanvienRole = await this.roleRepository.findOne({ where: { name: 'nhanvien' } });
        if (!nhanvienRole) {
            console.error('Không tìm thấy quyền nhanvien. Hãy chắc chắn RolesSeeder đã chạy trước!');
            return;
        }
        const adminEmployee = await this.employeeRepository.findOne({ where: { name: 'admin' } });
        if (!adminEmployee) {
            console.error('Không tìm thấy nhân viên admin. Hãy chắc chắn EmployeeSeeder đã chạy trước!');
            return;
        }
        const chefEmployee = await this.employeeRepository.findOne({ where: { name: 'bep' } });
        if (!chefEmployee) {
            console.error('Không tìm thấy nhân viên bep. Hãy chắc chắn EmployeeSeeder đã chạy trước!');
            return;
        }
        const nhanvienEmployee = await this.employeeRepository.findOne({ where: { name: 'nhanvien' } });
        if (!nhanvienEmployee) {
            console.error('Không tìm thấy nhân viên nhanvien. Hãy chắc chắn EmployeeSeeder đã chạy trước!');
            return;
        }
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash('123456', saltRound);

        const accountsData = [
            {
                username: 'admin',
                password: hashedPassword,
                roleId: adminRole.id,
                employeeId: adminEmployee.id,
                isDeleted: false,
            },
            {
                username: 'bep',
                password: hashedPassword,
                roleId: bepRole.id,
                employeeId: chefEmployee.id,
                isDeleted: false,
            },
            {
                username: 'nhanvien',
                password: hashedPassword,
                roleId: nhanvienRole.id,
                employeeId: nhanvienEmployee.id,
                isDeleted: false,
            },
        ];

        // 4. Lưu tài khoản admin vào database
        return this.accountRepository.save(accountsData);
    }

    async drop(): Promise<any> {
        // Xóa sạch bảng account khi thực hiện reset seeder
        return this.accountRepository.delete({});
    }
}