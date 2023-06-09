import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/controllers/category/dto/category.dto';
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

  @ApiProperty()
  category?: CategoryDto;

  constructor(product: Partial<Product>) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.category = product.category;
  }
}
