import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1686299657201 implements MigrationInterface {
  name = 'Migration1686299657201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
