import { nanoid } from "nanoid";
import { describe, it, expect } from "vitest";
import { AccountRepositoryInMemory } from "../../repositories/inmemory/accounts";
import { GetAccounts } from "../../usecases/accounts/getaccounts";

describe('Get accounts', () => {
    const user1_id = 'abc'
    const user2_id = 'def'
    const account1 = { id: nanoid(), agency: 1, account: 123465, institution_id: 'abc', user_id: user1_id };
    const account2 = { id: nanoid(), agency: 2, account: 987654, institution_id: 'def', user_id: user1_id };
    const account3 = { id: nanoid(), agency: 2, account: 555555, institution_id: 'def', user_id: user2_id };

    const repository = new AccountRepositoryInMemory();
    const sut = new GetAccounts(repository)

    repository.save(account1)
    repository.save(account2)
    repository.save(account3)

    it('Should all accounts for user 1', async () => {
        const response = await sut.execute(user1_id);
        expect(response).toBeTruthy();
        expect(response).toHaveProperty('accounts');
        expect(response.accounts).toHaveLength(2)
    });

    it('Should all accounts for user 2', async () => {
        const response = await sut.execute(user2_id);
        expect(response).toBeTruthy();
        expect(response).toHaveProperty('accounts');
        expect(response.accounts).toHaveLength(1)
    });

    it('Should return undefined if an invalid user id is provided', async () => {
        const id = 'invalid_id'
        const response = await sut.execute(id)
        expect(response).toHaveProperty('accounts')
        expect(response.accounts).toHaveLength(0)
    })
});
