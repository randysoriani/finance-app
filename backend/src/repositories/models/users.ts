import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UsersModel {
    @PrimaryColumn()
    id!: string
}