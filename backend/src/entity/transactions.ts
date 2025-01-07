export interface Transaction{
    id: string
    account_id: string
    description?: string
    type: string
    amount: number
    date: Date
}