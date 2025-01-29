import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTradeLinesTable1737649325647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'trade_lines',
            columns: [
                { name: 'id', type: 'varchar', isPrimary: true },
                { name: 'trade_id', type: 'varchar' },
                { name: 'ticker', type: 'varchar' },
                { name: 'qty', type: 'integer' },
                { name: 'price', type: 'integer' },
                { name: 'type', type: 'varchar' },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('trade_lines')
    }

}
