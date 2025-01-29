import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAccountRefTradesTable1737664695806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('trades', new TableColumn({
            name: 'account_id', type: 'varchar'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('trades', 'account_id')
    }

}
