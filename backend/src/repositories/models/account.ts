import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersModel } from "./users";
import { InstitutionsModel } from "./institutions";

@Entity('accounts')
export class AccountsModel{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    description?: string

    @Column()
    agency!: number

    @Column()
    account!: number

    @ManyToOne(() => UsersModel, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user_id!: UsersModel

    @ManyToOne(() => InstitutionsModel, (inst) => inst.id)
    @JoinColumn({name: 'institution_id'})
    institution_id!: InstitutionsModel
}