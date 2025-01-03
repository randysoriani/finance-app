import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UsersModel {
    @PrimaryColumn()
    id!: string

    @Column()
    email!: string

    @Column()
    password!: string
}