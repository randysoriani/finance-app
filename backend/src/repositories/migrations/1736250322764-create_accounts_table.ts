import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateAccountsTable1736250322764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'accounts', columns: [
            new TableColumn({ name: 'id', type: 'varchar', isPrimary: true }),
            new TableColumn({ name: 'user_id', type: 'varchar' }),
            new TableColumn({ name: 'institution_id', type: 'varchar' }),
            new TableColumn({ name: 'name', type: 'varchar' }),
            new TableColumn({ name: 'description', type: 'varchar', isNullable: true }),
            new TableColumn({ name: 'agency', type: 'integer' }),
            new TableColumn({ name: 'account', type: 'integer' }),
        ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('accounts')
    }

}
