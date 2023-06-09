import { PageReesult } from 'src/controllers/dto/page.result.dto';
import { ProductDto } from './product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindProductResultDto implements PageReesult<ProductDto> {
  @ApiProperty({ type: [ProductDto] })
  items: ProductDto[];
  @ApiProperty()
  count: number;

  constructor(items: ProductDto[], count: number) {
    this.items = items;
    this.count = count;
  }
}
