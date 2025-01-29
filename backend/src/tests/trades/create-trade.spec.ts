import { describe, it, expect } from 'vitest'
import { nanoid } from 'nanoid'
import { TradeRepositoryInMemory } from '../../repositories/inmemory/trades'
import { TradeLinesRepositoryInMemory } from '../../repositories/inmemory/tradeLines'
import { CreateTrade } from '../../usecases/trades/create-trade'
import { AccountRepositoryInMemory } from '../../repositories/inmemory/accounts'
import { User } from '../../entity/user'
import { Institution } from '../../entity/institution'

describe('Trades', () => {
    const tradeRepo = new TradeRepositoryInMemory()
    const lineRepo = new TradeLinesRepositoryInMemory()
    const accountRepository = new AccountRepositoryInMemory()

    const user: User = {email: '', id: nanoid(), password: ''}
    const institution: Institution = {code:123, id: nanoid(), name:'Inst1'}
    const account = {id: nanoid(), agency: 1, account: 1, user_id: user , institution_id: institution}

    accountRepository.save(account)

    const sut = new CreateTrade(tradeRepo, lineRepo, accountRepository)

    const doc_number = 12345678
    const tax_b3 = 123
    const tax_register = 11
    const tax_perquisite = 123
    const date = new Date()
    const line1 = {ticker: 'ABCD11', qty: 100, price: 100, type: 'buy'}
    const line2 = {ticker: 'DCBA11', qty: 50, price: 150, type: 'buy'}
    const line3 = {ticker: 'XYWZ11', qty: 10, price: 500, type: 'sell'}
    const lines = [line1, line2, line3]

    const trade = {
        account_id: account.id,
        doc_number, 
        date,
        tax_b3, 
        tax_register, 
        tax_perquisite, 
        lines
    }

    it('Should create a new trade', async () => {
        const response = await sut.execute(trade)
        expect(response).not.toBeInstanceOf(Error)

    })

    it('Should return error if account dont exists', async () => {
        const newTrade = {
            ...trade,
            account_id: 'invalid'
        }
        const response = await sut.execute(newTrade)
        expect(response).toBeInstanceOf(Error)
        expect(response).toMatchObject({message: 'Account not found'})

    })
})

