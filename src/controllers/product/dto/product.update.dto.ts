import { ApiProperty } from '@nestjs/swagger';

export class ProductUpdateDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: number;
}
