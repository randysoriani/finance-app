import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterIdFromUsersTable1736870389691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'id')
        await queryRunner.addColumn('users', new TableColumn({
            name: 'id', type: 'varchar', isPrimary: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'id')
        new TableColumn({name: 'id', type: 'varchar', isNullable: false, isUnique: true})
    }

}
