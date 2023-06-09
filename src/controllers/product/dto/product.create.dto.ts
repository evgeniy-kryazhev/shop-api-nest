import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  categoryId?: string;
}
