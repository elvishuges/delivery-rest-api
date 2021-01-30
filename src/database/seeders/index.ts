import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { Category } from "./categorySeed";

export class SeedPermissionsAndRoles1556357483083
    implements MigrationInterface {
    public async up(_: QueryRunner): Promise<any> {
        const category = await getRepository("gategory").save(
            Category
        );
    }

    public async down(_: QueryRunner): Promise<any> {
        // do nothing
    }
}