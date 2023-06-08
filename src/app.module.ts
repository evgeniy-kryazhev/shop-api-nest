import { Module } from '@nestjs/common';
import { ProductCotroller } from './controllers/product/product.controller';
import { DBModule } from './db/db.module';
import { ServiceModule } from './services/services.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './core/product/product';

@Module({
  controllers: [ProductCotroller],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'DB.db',
      entities: [Product],
      synchronize: false,
    }),
    DBModule,
    ServiceModule,
  ],
})
export class AppModule {}
