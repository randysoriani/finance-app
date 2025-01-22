import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('categories')
export class CategoriesModel{
    @PrimaryColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    icon?: string
}