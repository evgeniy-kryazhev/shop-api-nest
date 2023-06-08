import { DataSourceOptions } from 'typeorm';
import { Product } from './core/product/product';

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'DB.db',
  entities: [Product],
  migrationsRun: true,
  logging: true,
  synchronize: false,
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations_history',
};

export default ormconfig;
