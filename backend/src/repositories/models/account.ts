import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { UsersModel } from "./users";
import { InstitutionsModel } from "./institutions";
import { TransactionsModel } from "./transactions";

@Entity('accounts')
export class AccountsModel{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    description?: string

    @ManyToOne( () => UsersModel, (user) => user.id )
    @JoinColumn({name: 'user_id'})
    user_id!: string

    @ManyToOne( () => InstitutionsModel, (inst) => inst.id )
    @JoinColumn({name: 'institution_id'})
    institution_id!: string

    @OneToMany(() => TransactionsModel, (transaction: TransactionsModel) => transaction.account_id, {orphanedRowAction: 'delete'})
    @JoinColumn({name: 'account_id'})
    transactions!: TransactionsModel[];

    @Column()
    agency!: number

    @Column()
    account!: number
}