import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoriesTable1737487652092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns:[
                { name: 'id', type: 'varchar', isPrimary: true },
                { name: 'name', type: 'varchar' },
                { name: 'icon', type: 'varchar', isNullable: true }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('categories');
    }

}
