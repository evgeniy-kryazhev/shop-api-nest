import { DataSourceOptions } from 'typeorm';
import { Product } from './core/product/product';
import { Category } from './core/category/category';

export const dataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: '77.232.136.167',
  port: 3306,
  username: 'db_user',
  password: 'db_user_pass',
  database: 'app_db',
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
