import { beforeEach, describe, expect, it } from "vitest";
import { UserRepositoryInMemory } from "../../repositories/inmemory/users";
import { ResetPassword } from "../../usecases/users/resetpassword";
import { nanoid } from "nanoid";

describe('Change user password', ()=>{
    const id = nanoid()
    const email = 'valid@mail.com'
    const password = 'password123'
    const reset_token = 'reset123'

    const repo = new UserRepositoryInMemory()
    const sut = new ResetPassword(repo)

    beforeEach(() => {
        repo.save({id, email, password, reset_token})
    })    

    it('Should reset the user password if a valid token and a new password is provided', async () => {
        const response = await sut.execute(reset_token, id, 'newPassword123')
        expect(response).toBeTruthy()
    })

    it('Should return error if no user id is provided', async () => {
        const id = ''
        const response = await sut.execute(reset_token, id, 'newPassword123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toMatchObject({message: 'Missing mandatory param'})
    })

    it('Should return error if user is not found', async () => {
        const id = 'invalidId'
        const response = await sut.execute(reset_token, id, 'newPassword123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toMatchObject({message: 'User not found'})
    })

    it('Should return error if no token is provided', async () => {
        const reset_token = ''
        const response = await sut.execute(reset_token, id, 'newPassword123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toMatchObject({message: 'Missing mandatory param'})
    })

    it('Should return error if no token is provided', async () => {
        const reset_token = 'invalidToken'
        const response = await sut.execute(reset_token, id, 'newPassword123')
        expect(response).toBeInstanceOf(Error)
        expect(response).toMatchObject({message: 'Invalid token'})
    })
})