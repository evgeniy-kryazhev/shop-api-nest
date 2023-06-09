import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1686301562064 implements MigrationInterface {
  name = 'Migration1686301562064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`categoryId\` varchar(36) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`category\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD \`id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`categoryId\``,
    );
  }
}
