import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TradeLinesModel } from "./tradeLines";
import { AccountsModel } from "./account";

@Entity('trades')
export class TradesModel{
    @PrimaryColumn()
    id!: string

    @Column()
    doc_number!: number

    @Column({default: 0})
    tax_b3!: number
    
    @Column({default: 0})
    tax_register!: number

    @Column({default: 0})
    tax_perquisite!: number

    @Column()
    date!: Date

    @ManyToOne(() => AccountsModel, (account) => account.id)
    @JoinColumn({name: 'account_id'})
    account_id!: AccountsModel

    @OneToMany( () => TradeLinesModel, (line: TradeLinesModel) => line.trade_id, {orphanedRowAction: 'delete'}  )
    @JoinColumn({name: 'trade_id'})
    lines!: TradeLinesModel[]
}