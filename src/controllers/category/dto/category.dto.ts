import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProductDto } from 'src/controllers/product/dto/product.dto';
import { Category } from 'src/core/category/category';

export class CategoryDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
