import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateInstitutionsTable1735996498291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'institutions', columns: [
            new TableColumn({ name: 'id', type: 'varchar', isPrimary: true }),
            new TableColumn({ name: 'name', type: 'varchar', isUnique: true }),
            new TableColumn({ name: 'code', type: 'integer', isUnique: true }),
            new TableColumn({ name: 'icon', type: 'varchar', isNullable: true }),
        ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('institutions')
    }

}
