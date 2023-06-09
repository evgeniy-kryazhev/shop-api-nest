import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/category/category';
import { ICategoryService } from 'src/core/category/category.service.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findById(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async HasCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return category != null;
  }

  async create(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name: name });
    await this.categoryRepository.save(category);
    return category;
  }
}
