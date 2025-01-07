import { nanoid } from "nanoid";
import { describe, it, expect } from "vitest";
import { AccountRepositoryInMemory } from "../repositories/inmemory/accounts";
import { CreateAccount } from "../usecases/createaccount";
import { UserRepositoryInMemory } from "../repositories/inmemory/users";
import { InstitutionRepositoryInMemory } from "../repositories/inmemory/institutions";

describe('Create account', () => {
    const user = { id: nanoid(), email: 'valid@mail.com', password: 'pwd123'}
    const institution = { id: nanoid(), name: 'Bank 1', code: 123}

    const userRepo = new UserRepositoryInMemory()
    userRepo.save(user)
    const instRepo = new InstitutionRepositoryInMemory()
    instRepo.save(institution)

    const name = 'Wallet 1'
    const description = 'Saving account'
    const agency = 1
    const account = 1234567

    const repo = new AccountRepositoryInMemory()
    const sut = new CreateAccount(repo, userRepo, instRepo)

    it('Should create a new account', async () => {
        const response = await sut.execute(name, agency, account, user.id, institution.id, description)
        expect(response).toBeTruthy()
    })

    it('Should return error if name is not provided', async () => {
        const name = ''
        const response = await sut.execute(name, agency, account, user.id, institution.id, description)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message:'Missing mandatory params'})
    })

    it('Should return error if agency is not provided', async () => {
        const agency = NaN
        const response = await sut.execute(name, agency, account, user.id, institution.id, description)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message:'Missing mandatory params'})
    })

    it('Should return error if user isnt found', async () => {
        const user_id = 'invalid_user'
        const response = await sut.execute(name, agency, account, user_id, institution.id, description)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message:'Linked user or institution not found'})
    })

    it('Should return error if institution isnt found', async () => {
        const institution_id = 'invalid_institution'
        const response = await sut.execute(name, agency, account, user.id, institution_id, description)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message:'Linked user or institution not found'})
    })
})