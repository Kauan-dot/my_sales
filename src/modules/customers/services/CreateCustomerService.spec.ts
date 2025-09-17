import 'reflect-metadata';
import CreateCustomerService from "./CreateCustomerService";
import AppError from "@shared/errors/AppError";
import FakeCustomerRepository from "../domain/repositories/fake/FakeCustomerRepositories";
import { customerMock } from '../domain/factories/customerFactory';

let createCustomer: CreateCustomerService;
let fakeCustomersRepository: FakeCustomerRepository;

describe('CreateCustomerService', () => {
    beforeEach(() => {
        fakeCustomersRepository = new FakeCustomerRepository()
        createCustomer = new CreateCustomerService(fakeCustomersRepository);
    });
    it('should be able to create a new customer', async () => {
        const customer = await createCustomer.execute(customerMock)

        expect(customer).toHaveProperty('id');
        expect(customer.email).toBe('jondoe@example.com')
    })

    
    it('should not be able to create a new customer with email that is already in use', 
    async () => {
        await createCustomer.execute(customerMock);

        await expect(
            createCustomer.execute(customerMock)
        ).rejects.toBeInstanceOf(AppError)
    })
})

