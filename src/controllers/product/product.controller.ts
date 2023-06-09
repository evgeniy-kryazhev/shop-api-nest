import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  Delete,
  HttpException,
  Put,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CATEGORY_SERVICE, PRODUCT_SERVICE } from 'src/core/constants';
import { ProductDto } from './dto/product.dto';
import { ProductCreateDto } from './dto/product.create.dto';
import { Product } from 'src/core/product/product';
import { FindProductResultDto } from './dto/findProduct.result.dto';
import { FindProductRequestDto } from './dto/findProduct.request.dto';
import { ProductUpdateDto } from './dto/product.update.dto';
import { IProductService } from 'src/core/product/product.service.interface';
import { ICategoryService } from 'src/core/category/category.service.interface';

@ApiTags('product')
@Controller('product')
export class ProductCotroller {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
    @Inject(CATEGORY_SERVICE)
    private readonly categoryService: ICategoryService,
  ) {}

  @ApiResponse({ type: ProductDto })
  @Get('findById')
  async findById(@Query('id') id: string): Promise<ProductDto> {
    const product = await this.productService.findById(id);
    console.log(product);
    return new ProductDto({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });
  }

  @ApiResponse({ type: FindProductResultDto, isArray: false })
  @ApiBody({ type: FindProductRequestDto, required: false })
  @Post('find')
  async fiindAll(
    @Body() dto?: FindProductRequestDto,
  ): Promise<FindProductResultDto> {
    const findArgs = {
      skip: dto.skip,
      take: dto.take,
      filter: dto.filter,
    };
    const products = await this.productService.findAll(findArgs ?? {});
    const count = await this.productService.getCount(findArgs);

    const productDtos = products.map(
      (product) =>
        new ProductDto({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
        }),
    );
    return new FindProductResultDto(productDtos, count);
  }

  @ApiResponse({ type: ProductDto })
  @Post('create')
  async create(@Body() productDto: ProductCreateDto): Promise<ProductDto> {
    const product = new Product();
    product.name = productDto.name;
    product.price = productDto.price;
    product.description = productDto.description;

    if (productDto.categoryId) {
      const HasCategory = await this.categoryService.HasCategory(
        productDto.categoryId,
      );
      if (HasCategory) {
        const category = await this.categoryService.findById(
          productDto.categoryId,
        );
        product.category = category;
      }
    }

    return await this.productService.create(product);
  }

  @Delete('delete')
  async delete(@Query('id') id: string): Promise<void> {
    const hasProduct = await this.productService.hasProduct(id);
    if (!hasProduct) {
      throw new HttpException('Product not found', 404);
    }
    await this.productService.delete(id);
  }

  @ApiResponse({ type: ProductDto, isArray: false })
  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() productDto: ProductUpdateDto,
  ): Promise<ProductDto> {
    await this.productService.update(id, productDto);
    const product = await this.productService.findById(id);
    return new ProductDto(product);
  }
}
