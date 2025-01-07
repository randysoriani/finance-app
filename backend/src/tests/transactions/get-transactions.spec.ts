import { nanoid } from "nanoid";
import { describe, it, expect } from "vitest";
import { TransactionRepositoryInMemory } from "../../repositories/inmemory/transactions";
import { GetTransactions } from "../../usecases/transactions/gettransactions";

describe('Get transactions', () => {
    const transaction1 = { id: nanoid(), account_id: 'acc_id', amount: 123, date: new Date(), type: 'Credit', description: 'Salary' }
    const transaction2 = { id: nanoid(), account_id: 'acc_id', amount: 5565, date: new Date(), type: 'Debit', description: 'Investiment' }
    
    const repository = new TransactionRepositoryInMemory()
    repository.save(transaction1)
    repository.save(transaction2)
    
    const sut = new GetTransactions(repository)

    it('Should all transactions', async () => {
        const response = await sut.execute();
        expect(response).toBeTruthy();
        expect(response).toHaveProperty('transactions');
        expect(response.transactions).toHaveLength(2)
    });

    it('Should return just one transaction', async () => {
        const response = await sut.execute(transaction1.id)
        expect(response).toBeTruthy();
        expect(response).toHaveProperty('transaction');
        expect(response.transaction).toHaveProperty('id')
    })

    it('Should return an empty transaction object if invalid id is provided', async () => {
        const id = 'invalid_id'
        const response = await sut.execute(id)
        expect(response.transaction).toBeUndefined()
    })
})