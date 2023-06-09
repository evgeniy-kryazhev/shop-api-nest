import { Module } from '@nestjs/common';
import { ProductCotroller } from './controllers/product/product.controller';
import { DBModule } from './db/db.module';
import { ServiceModule } from './services/services.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './ormconfig';
import { LoggerModule } from 'nestjs-pino';

@Module({
  controllers: [ProductCotroller],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'error',
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    TypeOrmModule.forRoot(dataSourceConfig),
    DBModule,
    ServiceModule,
  ],
})
export class AppModule {}
