import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AccountsModel } from "./account";
import { CategoriesModel } from "./categories";

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

    @ManyToOne( () => CategoriesModel, (category) => category.id )
    @JoinColumn({name: 'category_id'})
    category!: string

    @Column()
    amount!: number
    
    @Column()
    date!: Date
}