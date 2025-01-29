import { Trades } from "../entity/investment"

export interface NewTradeLineDTO{
    ticker: string
    qty: number
    price: number
    type: string
    trade_id: Trades
}

export interface NewTradeDTO{
    account_id: string
    doc_number: number
    tax_b3: number
    tax_register: number
    tax_perquisite: number
    lines: NewTradeLineDTO[]
    date: Date
}