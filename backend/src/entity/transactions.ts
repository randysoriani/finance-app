export interface Transaction{
    id: string
    account: string
    description?: string
    type: string
    category: string
    amount: number
    date: Date
}