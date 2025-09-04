import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddProductIdToOrdersProducts1756950691628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_products',
            new TableColumn({
                name: 'prduct_id',
                type: 'integer',
                isNullable: true,
            })
        ),

        await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
                name: 'OrderProductsProduct',
                columnNames: ['prduct_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 'OrderProductsProduct')
        await queryRunner.dropColumn('orders_products', 'prduct_id')
    }

}
