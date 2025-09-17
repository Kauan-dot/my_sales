import 'reflect-metadata';
import { User } from "../infra/database/entities/User";
import AppError from "@shared/errors/AppError";
import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import CreateSessionsService from "./SessionUserService";

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}))

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'fake-token'),
}));

const mockUserData: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'jondoe@example.com',
        password: 'hashed-password',
        created_at: new Date(),
        updated_at: new Date(),
        getAvatarUrl() {
            return 'avatar.jpg';
        },
    } as User,
];

let fakeUserRepositories: FakeUserRepositories;
let createSessionsService: CreateSessionsService;

describe('SessionUserService', () => {
    beforeEach(() => {
        fakeUserRepositories = new FakeUserRepositories();
        createSessionsService = new CreateSessionsService(fakeUserRepositories);
    });

    it('should be able to authenticate with valid crentials', async() => {
        const user = { ...mockUserData[0] };
        const { email, password } = user;

        await fakeUserRepositories.create(user);

        (require('bcrypt').hash as jest.Mock).mockResolvedValue('hashed-password');
        (require('bcrypt').compare as jest.Mock).mockResolvedValue(true);

        const response = await createSessionsService.execute({ email, password });

        expect(response).toHaveProperty('token');
        expect(response.user.email).toBe(email);
    })

    it('should not be able to authenticate with non existing user', async() => {
        await expect(
            createSessionsService.execute({
                email: 'nonexisting@example.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
})