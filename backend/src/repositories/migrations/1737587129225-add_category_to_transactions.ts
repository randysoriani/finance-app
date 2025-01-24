import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCategoryToTransactions1737587129225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('transactions', new TableColumn(
            {name:'category_id', type:'varchar', isNullable: true}
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('transactions', 'category_id')
    }

}
