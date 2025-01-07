import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { AccountsModel } from "./account";

@Entity('users')
export class UsersModel {
    @PrimaryColumn()
    id!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    reset_token!: string

    @OneToMany(() => AccountsModel, (accounts: AccountsModel) => accounts.institution_id, {orphanedRowAction: 'delete'})
    @JoinColumn({name: 'user_id'})
    accounts!: AccountsModel[];
}