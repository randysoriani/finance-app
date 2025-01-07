import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { AccountsModel } from "./account";

@Entity('institutions')
export class InstitutionsModel{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    code!: number

    @Column()
    icon?: string

    @OneToMany(() => AccountsModel, (accounts: AccountsModel) => accounts.institution_id, {orphanedRowAction: 'delete'})
    @JoinColumn({name: 'institution_id'})
    accounts!: AccountsModel[];
}