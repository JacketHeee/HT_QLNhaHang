import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): Promise<Customer[]>;
    findOne(id: string): Promise<Customer>;
    create(customer: Partial<Customer>): Promise<Customer>;
    update(id: string, customer: Partial<Customer>): Promise<Customer>;
    remove(id: string): Promise<void>;
}
