import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
export declare class EmployeesService {
    private employeesRepository;
    constructor(employeesRepository: Repository<Employee>);
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee>;
    findByUsername(username: string): Promise<Employee>;
    create(employeeData: Partial<Employee>): Promise<Employee>;
    update(id: number, employeeData: Partial<Employee>): Promise<Employee>;
    toggleActive(id: number, isActive: boolean): Promise<Employee>;
    remove(id: number): Promise<void>;
}
