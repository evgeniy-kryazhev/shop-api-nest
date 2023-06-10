import { DataSourceOptions } from 'typeorm';
import { Product } from './core/product/product';
import { Category } from './core/category/category';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: '188.225.33.132',
  port: 5432,
  username: 'gen_user',
  password: '6eg490qtk3',
  database: 'default_db',
  entities: [Product, Category],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};

export const ormconfig: DataSourceOptions = {
  ...dataSourceConfig,
  migrationsRun: true,
  logging: true,
  synchronize: false,
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations_history',
};

export default ormconfig;
