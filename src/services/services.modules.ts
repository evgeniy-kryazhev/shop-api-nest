import { Module } from '@nestjs/common';
import { CATEGORY_SERVICE, PRODUCT_SERVICE } from '../core/constants';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/core/product/product';
import { Category } from 'src/core/category/category';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
    {
      provide: CATEGORY_SERVICE,
      useClass: CategoryService,
    },
  ],
  exports: [PRODUCT_SERVICE, CATEGORY_SERVICE],
})
export class ServiceModule {}
