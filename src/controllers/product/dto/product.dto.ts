import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/core/product/product';

export class ProductDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: number;

  constructor(product: Partial<Product>) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
  }
}
