import { describe, it, expect } from "vitest";
import { AccountRepositoryInMemory } from "../../repositories/inmemory/accounts";
import { CreateTransaction } from "../../usecases/transactions/create-transaction";
import { TransactionRepositoryInMemory } from "../../repositories/inmemory/transactions";
import { nanoid } from "nanoid";

describe('Create transaction', () => {
    const account_id = nanoid()
    const desc = 'Salary'
    const type = 'Credit'
    const amount = 500000
    const date = new Date()

    const accountRepository = new AccountRepositoryInMemory()
    accountRepository.save({id: account_id, account: 1234565, agency: 1, institution_id: 'inst_id', name: 'Wallet 1', user_id: 'user_id'})

    const repository = new TransactionRepositoryInMemory()
    const sut = new CreateTransaction(repository, accountRepository)

    it('Should create a transaction', async () => {
        const response = await sut.execute(account_id, desc, type, amount, date)
        expect(response).toBeTruthy()
        expect(response).toHaveProperty('id')
    })

    it('Should return error if account is not found', async () => {
        const account_id = 'invalid_id'
        const response = await sut.execute(account_id, desc, type, amount, date)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Account not found'})
    })

    it('Should return error if account id is not provided', async () => {
        const account_id = ''
        const response = await sut.execute(account_id, desc, type, amount, date)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory params'})
    })

    it('Should return error if type is not provided', async () => {
        const type = ''
        const response = await sut.execute(account_id, desc, type, amount, date)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory params'})
    })
})