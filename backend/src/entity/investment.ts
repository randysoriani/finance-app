import { Account } from "./account"

export interface Trades{
    id: string
    account_id: Account
    doc_number: number
    tax_b3: number
    tax_register: number
    tax_perquisite: number
    date: Date
}

export interface TradeLines{
    id: string
    trade_id: string
    type: string
    ticker: string
    qty: number
    price: number
}