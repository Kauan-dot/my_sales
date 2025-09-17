import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import CreateUserService from "./CreateUserService";
import { hash } from 'bcrypt';
import AppError from "@shared/errors/AppError";

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}))

let fakeUserRepositories: FakeUserRepositories;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeUserRepositories = new FakeUserRepositories();
        createUserService = new CreateUserService(fakeUserRepositories);
    })
    it('should be able to create a new user', async() => {
        (hash as jest.Mock).mockReturnValue('hashed-password');

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'jondoe@example.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('jondoe@example.com');
    })

    it('should not be able to create a user with email that is already in use', async() => {
        await createUserService.execute({
            name: 'John Doe',
            email: 'jondoe@example.com',
            password:'123456',
        });

        await expect(createUserService.execute({
            name: 'John Doe',
            email: 'jondoe@example.com',
            password:'654321',
        })
    ).rejects.toBeInstanceOf(AppError);
    })

    it('should hash the password before saving the user', async() => {
        const hashSpy = jest
            .spyOn(require('bcrypt'), 'hash')
            .mockResolvedValue('hashed-password');

        await createUserService.execute({
            name: 'John Doe',
            email: 'jondoe@example.com',
            password: '123456',
        })

        expect(hashSpy).toHaveBeenCalledWith('123456', 8);
    })
})