import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    findAll(): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    create(employee: Partial<Employee>): Promise<Employee>;
    update(id: string, employee: Partial<Employee>): Promise<Employee>;
    toggleActive(id: string, isActive: boolean): Promise<Employee>;
    remove(id: string): Promise<void>;
}
