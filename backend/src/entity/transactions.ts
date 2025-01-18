export interface Transaction{
    id: string
    account: string
    description?: string
    type: string
    amount: number
    date: Date
}