import { ICustomersRepository } from "../ICustomersRepositories";
import { ICreateCustomer } from "../../models/ICreateUser";
import { ICustomer } from "../../models/ICustumer";
import { Customer } from "@modules/customers/infra/database/entities/Customer";

export default class FakeCustomerRepository implements ICustomersRepository {
    private customers: Customer[] = [];

    public async create({name, email}: ICreateCustomer): Promise<Customer> {
        const customer = new Customer();

        customer.id = this.customers.length + 1;
        customer.name = name;
        customer.email = email;

        this.customers.push(customer);
        
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | null> {
        const found = this.customers.find(customer => customer.email === email);
        return found ?? null;
    }

    public async save(customer: Customer): Promise<Customer> {
        const findIndex = this.customers.findIndex(c => c.id === customer.id);
        this.customers[findIndex] = customer 
        return customer;
    }

    public async remove(customer: Customer): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async findById(id: number): Promise<Customer | null> {
        const customer = this.customers.find(customer => customer.id === id);
        return customer as Customer | null
    }

    public async findAll(): Promise<ICustomer[] | undefined> {
        return undefined
    }

    public async findByName(name: string): Promise<ICustomer | null> {
        const customer = this.customers.find(customer => customer.name === name);
        return customer as Customer | null
    }

    public async findAndCount(pagination: { skip: number; take: number }): Promise<[ICustomer[], number]> {
        const { skip, take } = pagination;
        const customers = this.customers.slice(skip, skip + take);
        return [customers, this.customers.length];
    }
}