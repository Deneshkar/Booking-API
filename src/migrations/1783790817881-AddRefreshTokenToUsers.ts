import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUsers1783790817881 implements MigrationInterface {
    name = 'AddRefreshTokenToUsers1783790817881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRefreshToken" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRefreshToken"`);
    }

}
