import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('transactions')
export class TransactionsModel{
    @PrimaryColumn()
    id!: string

    @Column()
    account_id!: string

    @Column()
    description!: string

    @Column()
    type!: string

    @Column()
    amount!: number
    
    @Column()
    date!: Date
}