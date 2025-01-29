import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateTradesTable1737647072812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'trades', columns: [
            { name: 'id', type: 'varchar', isPrimary: true },
            { name: 'doc_number', type: 'integer' },
            { name: 'tax_b3', type: 'integer', isNullable: true },
            { name: 'tax_register', type: 'integer', isNullable: true },
            { name: 'tax_perquisite', type: 'integer', isNullable: true },
            { name: 'bid_total', type: 'integer', isNullable: true },
            { name: 'date', type: 'date' },
        ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('trades')
    }

}
