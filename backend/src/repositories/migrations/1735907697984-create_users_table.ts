import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateUsersTable1735907697984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'users', columns: [
            new TableColumn({name: 'id', type: 'varchar', isNullable: false, isUnique: true}),
            new TableColumn({name: 'email', type: 'varchar', isNullable: false, isUnique: true}),
            new TableColumn({name: 'password', type: 'varchar', isNullable: false}),
            new TableColumn({name: 'created_at', type: 'timestamp', default: 'now()'}),
        ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
