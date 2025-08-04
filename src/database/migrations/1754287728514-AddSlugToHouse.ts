import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSlugToHouse1754287728514 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"house",
			new TableColumn({
				name: "slug",
				type: "varchar",
				isUnique: true,
				isNullable: false,
				default: "''",
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("house", "slug");
	}
}
