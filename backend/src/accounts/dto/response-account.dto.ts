import { Role } from "src/roles/entities/role.entity";
import { Employee } from "src/employees/entities/employee.entity";

export class AccountResponseDto {
    ID: number;
    userName: string;
    role?: Role;
    employee?: Employee;
} 