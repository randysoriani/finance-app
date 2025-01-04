import { Column, Entity, PrimaryColumn } from "typeorm";

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
}