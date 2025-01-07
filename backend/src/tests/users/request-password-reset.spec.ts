import { beforeAll, describe, expect, it } from "vitest";
import { UserRepositoryInMemory } from "../../repositories/inmemory/users";
import { nanoid } from "nanoid";
import { RequestPasswordReset } from "../../usecases/users/requestpasswordreset";

describe('Request password reset', () => {
    const id = nanoid()
    const email = 'valid@email.com'
    const password = 'password123'

    const repo = new UserRepositoryInMemory()
    const sut = new RequestPasswordReset(repo)

    beforeAll(()=>{
        repo.save({id, email, password})
    })

    it('Should return a reset token if a valid email is provided', async () => {
        const response = await sut.execute(email)
        expect(response).toBeTruthy()
        expect(response).not.toBeInstanceOf(Error)
    })

    it('Should return error if no email is provided', async () => {
        const email = ''
        const response = await sut.execute(email)
        expect(response).toBeInstanceOf(Error)
    })

    it('Should return error if invalid email is provided', async () => {
        const email = 'invalid@mail.com'
        const response = await sut.execute(email)
        expect(response).toBeInstanceOf(Error)
    })
})