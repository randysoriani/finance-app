import { beforeAll, describe, expect, it } from "vitest";
import { UserRepositoryInMemory } from "../repositories/inmemory/users";
import { hashSync } from "bcryptjs";
import { AuthUser } from "../usecases/authuser";

describe('Auth user', () => {
    const id = '123'
    const email = 'valid@mail.com'
    const hash = hashSync('password123', 10)

    const repo = new UserRepositoryInMemory()
    const sut = new AuthUser(repo)

    beforeAll(() => {
        repo.save({id, email, password: hash})
    })

    it('Should return access and refresh tokens for valid email and password', async () => {
        const response = await sut.execute(email, 'password123')
        expect(response).toBeTruthy()
        expect(response).not.toBeInstanceOf(Error)
        expect(response).toHaveProperty('accessToken')
        expect(response).toHaveProperty('refreshToken')
    })

    it('Should return error if no password is provided', async () => {
        const password = ''
        const response = await sut.execute(email, password)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message');
        expect(response).toMatchObject({message: 'Missing mandatory params'})
    })

    it('Should return error if no email is provided', async () => {
        const email = ''
        const response = await sut.execute(email, 'password123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message');
        expect(response).toMatchObject({message: 'Missing mandatory params'})
    })

    it('Should return error if wrong email is provided', async () => {
        const email = 'invalid@mail.com'
        const response = await sut.execute(email, 'password123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message');
        expect(response).toMatchObject({message: 'User not found'})
    })

    it('Should return error if wrong pass is provided', async () => {
        const response = await sut.execute(email, 'invalidPass123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message');
        expect(response).toMatchObject({message: 'Password dont match'})
    })
})