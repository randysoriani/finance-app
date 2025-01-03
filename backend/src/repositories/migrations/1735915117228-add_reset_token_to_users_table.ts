import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddResetTokenToUsersTable1735915117228 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn(
            { name: 'reset_token', type: 'varchar', isNullable: true }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'reset_token')
    }
}
