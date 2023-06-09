import { Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/core/category/category';
import { ICategoryService } from 'src/core/category/category.service.interface';
import { CATEGORY_SERVICE } from 'src/core/constants';
import { CategoryDto } from './dto/category.dto';

@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly categoryService: ICategoryService,
  ) {}

  @Post('create')
  async create(@Query('name') name: string): Promise<Category> {
    return this.categoryService.create(name);
  }

  @ApiResponse({ type: [CategoryDto] })
  @Get('all')
  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.findAll();
    return categories.map((category) => new CategoryDto(category));
  }
}
