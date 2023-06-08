import { Module } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../core/constants';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/core/product/product';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
  ],
  exports: [PRODUCT_SERVICE],
})
export class ServiceModule {}
