import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { TransactionsModel } from "./transactions";

@Entity('categories')
export class CategoriesModel{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    icon?: string

    @OneToMany(() => TransactionsModel, (transaction: TransactionsModel) => transaction.category, {orphanedRowAction: 'delete'})
    @JoinColumn({name: 'category_id'})
    transactions!: TransactionsModel[];
}