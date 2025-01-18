import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AccountsModel } from "./account";

@Entity('transactions')
export class TransactionsModel{
    @PrimaryColumn()
    id!: string

    @ManyToOne( () => AccountsModel, (account) => account.id )
    @JoinColumn({name: 'account_id'})
    account!: string

    @Column()
    description!: string

    @Column()
    type!: string

    @Column()
    amount!: number
    
    @Column()
    date!: Date
}