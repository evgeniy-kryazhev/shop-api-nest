import { ApiProperty } from '@nestjs/swagger';
import { MAX_TAKE } from 'src/core/constants';

export class FindProductRequestDto {
  @ApiProperty({
    nullable: true,
    default: 0,
  })
  skip?: number;

  @ApiProperty({ nullable: true, default: MAX_TAKE })
  take?: number;

  @ApiProperty({ nullable: true, default: null })
  filter?: string | null;
}
