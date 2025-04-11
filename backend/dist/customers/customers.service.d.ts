import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
export declare class CustomersService {
    private customersRepository;
    constructor(customersRepository: Repository<Customer>);
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    create(customerData: Partial<Customer>): Promise<Customer>;
    update(id: number, customerData: Partial<Customer>): Promise<Customer>;
    remove(id: number): Promise<void>;
}
