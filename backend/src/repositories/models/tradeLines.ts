import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TradesModel } from "./trades";

@Entity('trade_lines')
export class TradeLinesModel{
    @PrimaryColumn()
    id!: string

    @Column()
    ticker!: string

    @Column()
    qty!: number

    @Column()
    price!: number

    @Column()
    type!: string

    @ManyToOne(() => TradesModel, (trade) => trade.id)
    @JoinColumn({name: 'trade_id'})
    trade_id!: TradesModel
}