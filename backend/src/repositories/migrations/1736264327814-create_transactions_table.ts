import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateTransactionsTable1736264327814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({ name: 'transactions', columns: [
            new TableColumn({ name: 'id', type: 'varchar', isPrimary: true }),
            new TableColumn({ name: 'account_id', type: 'varchar' }),
            new TableColumn({ name: 'description', type: 'varchar', isNullable: true }),
            new TableColumn({ name: 'type', type: 'varchar' }),
            new TableColumn({ name: 'amount', type: 'integer' }),
            new TableColumn({name: 'date', type: 'timestamp' }),
        ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('transactions')
    }

}
