import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) {}

    async findAll(): Promise<Customer[]> {
        return this.customersRepository.find({ relations: ['orders'] });
    }

    async findOne(id: number): Promise<Customer> {
        const customer = await this.customersRepository.findOne({
            where: { id },
            relations: ['orders'],
        });
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    }

    async create(customerData: Partial<Customer>): Promise<Customer> {
        const customer = this.customersRepository.create(customerData);
        return this.customersRepository.save(customer);
    }

    async update(id: number, customerData: Partial<Customer>): Promise<Customer> {
        await this.customersRepository.update(id, customerData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.customersRepository.delete(id);
    }
}