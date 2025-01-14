import { Institution } from "./institution"
import { User } from "./user"

export interface Account{
    id: string
    description?: string
    agency: number
    account: number
    user_id: User
    institution_id: Institution
}