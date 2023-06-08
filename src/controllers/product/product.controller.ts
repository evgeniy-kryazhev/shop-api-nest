import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PRODUCT_SERVICE } from 'src/core/constants';
import { ProductDto } from './dto/product.dto';
import { ProductService } from 'src/services/product.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { Product } from 'src/core/product/product';

@ApiTags('product')
@Controller('product')
export class ProductCotroller {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: ProductService,
  ) {}

  @ApiResponse({ type: ProductDto, isArray: true })
  @Get('find')
  async fiindAll(): Promise<ProductDto[]> {
    const products = await this.productService.findAll();
    return products.map(
      (product) =>
        new ProductDto({
          id: product.id,
          name: product.name,
          price: product.price,
        }),
    );
  }

  @Post('create')
  async create(@Body() productDto: ProductCreateDto): Promise<ProductDto> {
    const product = new Product();
    product.name = productDto.name;
    product.price = productDto.price;
    product.description = productDto.description;
    return await this.productService.create(product);
  }
}
